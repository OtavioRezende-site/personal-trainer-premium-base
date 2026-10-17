import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { whatsappUrl, instagramUrl } from "../src/lib/contact";

const viewports = [
  [320,568], [360,800], [375,812], [390,844], [414,896], [430,932],
  [768,1024], [820,1180], [1024,768], [1440,900], [1920,1080], [820,768],
];
for (const [width,height] of viewports) {
  test(`layout and correct media at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width,height });
    const errors: string[] = [];
    const sources = new Set<string>();
    page.on("pageerror", e => errors.push(e.message));
    page.on("request", req => { if (/hero-(desktop|mobile)\.mp4/.test(req.url())) sources.add(new URL(req.url()).pathname); });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const video = page.locator("video");
    const expected = width >= 1024 || width >= 768 && width > height ? "desktop" : "mobile";
    await expect(video).toHaveAttribute("src", `/videos/hero-${expected}.mp4`);
    await expect(video).toHaveJSProperty("muted", true);
    await expect.poll(() => video.evaluate(v => (v as HTMLVideoElement).readyState)).toBeGreaterThanOrEqual(2);
    await expect(page.getByRole("heading", {level:1})).toBeVisible();
    const title = await page.locator("h1").boundingBox();
    expect(title!.x).toBeGreaterThanOrEqual(0);
    expect(title!.x + title!.width).toBeLessThanOrEqual(width + 1);
    const lineWidths = await page.locator(".hero-title-line > span").evaluateAll(elements => elements.map(el=>({right:el.getBoundingClientRect().right, left:el.getBoundingClientRect().left})));
    for (const line of lineWidths) { expect(line.left).toBeGreaterThanOrEqual(0); expect(line.right).toBeLessThanOrEqual(width); }
    // Scroll the whole document to exercise lazy content, sticky navigation and reveals.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 650) { window.scrollTo(0,y); await new Promise(r=>setTimeout(r,30)); }
      window.scrollTo(0,0);
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(sources).toEqual(new Set([`/videos/hero-${expected}.mp4`]));
    expect(errors).toEqual([]);
  });
}

test("mobile navigation, contact dialog, focus and FAQ work", async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto("/");
  const opener = page.getByRole("button", {name:"Abrir menu de navegação"});
  await opener.click();
  const menu = page.getByRole("dialog", {name:"Menu de navegação"});
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await menu.getByRole("link",{name:/O método/}).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#metodo$/);
  const question = page.getByRole("button",{name:/Como funciona a primeira conversa/});
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded","true");
  await expect(page.getByRole("region",{name:/Como funciona a primeira conversa/})).toBeVisible();
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded","false");
  await page.locator("#contato").getByRole("button",{name:"Vamos conversar"}).click();
  const contact = page.getByRole("dialog",{name:/UMA BOA CONVERSA/});
  await expect(contact).toBeVisible();
  await expect(contact).toContainText("Nenhuma mensagem será enviada");
  await page.keyboard.press("Escape");
  await expect(contact).not.toBeVisible();
  expect(await page.evaluate(()=>document.body.style.overflow)).toBe("");
  await opener.click();
  await menu.getByRole("button",{name:"Vamos conversar"}).click();
  await expect(contact).toBeVisible();
  expect(await page.evaluate(()=>document.body.style.overflow)).toBe("hidden");
  await contact.getByRole("button",{name:"Fechar contato"}).click();
  expect(await page.evaluate(()=>document.body.style.overflow)).toBe("");
});

test("service tabs support pointer and keyboard selection", async ({ page }) => {
  await page.goto("/");
  const online = page.getByRole("tab",{name:/Acompanhamento online/});
  await online.click();
  await expect(online).toHaveAttribute("aria-selected","true");
  await expect(page.getByRole("tabpanel",{name:/Acompanhamento online/})).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab",{name:/Programa individualizado/})).toBeFocused();
  await expect(page.getByRole("tabpanel",{name:/Programa individualizado/})).toBeVisible();
  await page.keyboard.press("Home");
  await expect(page.getByRole("tab",{name:/Personal presencial/})).toBeFocused();
});

test("reduced motion does not download a video until explicitly requested", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  const requests: string[]=[];
  page.on("request",req=>{if(req.url().endsWith(".mp4")) requests.push(req.url());});
  await page.goto("/");
  await expect(page.locator("video")).toHaveCount(0);
  await expect(page.locator(".hero-poster")).toBeVisible();
  expect(requests).toEqual([]);
  await expect.poll(() => page.locator(".hero-title-line > span").evaluateAll(elements => elements.every(el => {
    const transform = getComputedStyle(el).transform;
    return transform === "none" || new DOMMatrixReadOnly(transform).m42 === 0;
  }))).toBe(true);
  await page.getByRole("button",{name:"Reproduzir vídeo de fundo"}).click();
  await expect(page.locator("video")).toHaveCount(1);
  await expect(page.getByRole("button",{name:"Pausar vídeo de fundo"})).toBeVisible();
  await page.getByRole("button",{name:"Pausar vídeo de fundo"}).click();
  await expect(page.locator("video")).toHaveJSProperty("paused",true);
});

test("failed video retains poster and working CTAs", async ({page})=>{
  await page.route("**/*.mp4",route=>route.abort());
  await page.goto("/");
  await expect(page.getByRole("button",{name:"Reproduzir vídeo de fundo"})).toContainText("Tentar vídeo novamente");
  await expect(page.locator(".hero-poster")).toBeVisible();
  await page.getByRole("button",{name:"Começar minha evolução"}).click();
  await expect(page.getByRole("dialog",{name:/UMA BOA CONVERSA/})).toBeVisible();
});

for (const width of [390,1440]) {
  test(`no serious accessibility violations at ${width}px`, async ({ page }) => {
    await page.setViewportSize({width,height:900});
    await page.emulateMedia({reducedMotion:"reduce"});
    await page.goto("/");
    const result = await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
    expect(result.violations).toEqual([]);
  });
}

test("SEO, privacy and genuine-data safeguards", async ({page, request})=>{
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang","pt-BR");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content","noindex, nofollow");
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
  await expect(page.locator("#onde")).toHaveCount(0);
  await expect(page.getByRole("heading",{name:/EXPERIÊNCIAS REAIS/})).toHaveCount(0);
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/opengraph-image.png")).headers()["content-type"]).toContain("image/png");
  await page.getByRole("link",{name:"Privacidade",exact:true}).click();
  await expect(page.getByRole("heading",{level:1})).toContainText("SUA PRIVACIDADE");
});

test("contact builders reject missing or unsafe data and encode a valid Brazilian number",()=>{
  expect(whatsappUrl(null,"Olá")).toBeNull();
  expect(whatsappUrl("javascript:alert(1)","Olá")).toBeNull();
  expect(whatsappUrl("123","Olá")).toBeNull();
  const testNumber = "55" + "11" + "9" + "0".repeat(8);
  expect(whatsappUrl(testNumber,"Olá! Quero treinar.")).toBe(`https://wa.me/${testNumber}?text=Ol%C3%A1!%20Quero%20treinar.`);
  expect(instagramUrl("javascript:alert(1)")).toBeNull();
  expect(instagramUrl(null)).toBeNull();
});

test("autoplay denial leaves a poster and an explicit playback action", async ({page})=>{
  await page.addInitScript(()=>{
    // Block both native autoplay and the imperative play() path. Mocking play()
    // alone does not stop the browser from starting the autoplay attribute.
    const setAttribute = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function(name, value) {
      if (this instanceof HTMLMediaElement && name.toLowerCase() === "autoplay") return;
      setAttribute.call(this, name, value);
    };
    Object.defineProperty(HTMLMediaElement.prototype, "autoplay", { get: () => false, set: () => {}, configurable: true });
    HTMLMediaElement.prototype.play = function() { return Promise.reject(new DOMException("Autoplay blocked", "NotAllowedError")); };
  });
  await page.goto("/");
  await expect(page.locator("video")).toHaveCount(1);
  await expect(page.getByRole("button",{name:"Reproduzir vídeo de fundo"})).toBeVisible();
  await expect(page.locator(".hero-poster")).toBeVisible();
  await expect(page.locator("video")).not.toHaveClass(/is-ready/);
});
