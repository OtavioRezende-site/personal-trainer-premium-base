import { ImageResponse } from "next/og";
import { trainer } from "@/data/trainer";
export const alt = "Treino com propósito. Movimento com a sua medida.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", background: trainer.brand.background, color: trainer.brand.ivory, width: "100%", height: "100%", padding: "56px 64px", fontFamily: "sans-serif" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}><span>{trainer.name.toUpperCase()} / {trainer.professionalTitle.toUpperCase()}</span>{trainer.isDemo && <span style={{ color: trainer.brand.accent, fontSize: 18 }}>DEMONSTRAÇÃO</span>}</div><div style={{ display: "flex", flexDirection: "column", fontWeight: 800, fontSize: 98, lineHeight: 1.02, letterSpacing: "-5px" }}>{trainer.hero.headline.map((line, i) => <span style={{ color: i === trainer.hero.highlightLine ? trainer.brand.accent : trainer.brand.ivory }} key={line}>{line}</span>)}</div><div style={{ display: "flex", borderTop: "1px solid #4b5047", paddingTop: 20, fontSize: 18, letterSpacing: "3px" }}>{trainer.hero.eyebrow}</div></div>, size);
}
