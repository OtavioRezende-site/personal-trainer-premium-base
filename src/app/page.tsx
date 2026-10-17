import { trainer } from "@/data/trainer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Services } from "@/components/services";
import { FAQ } from "@/components/faq";
import { About, Personalized, ManifestoStrip, Methodology, Differentiators, Gallery, Testimonials, Location, FinalCTA } from "@/components/editorial-sections";
import { visibleAreas } from "@/lib/content";

export default function Home() {
  const structuredData = !trainer.isDemo && trainer.seo.siteUrl ? {
    "@context": "https://schema.org", "@type": "Person",
    name: trainer.name, jobTitle: trainer.professionalTitle, url: trainer.seo.siteUrl,
    ...(trainer.contact.whatsapp ? { telephone: `+${trainer.contact.whatsapp.replace(/\D/g, "")}` } : {}),
    ...(visibleAreas.length ? { areaServed: visibleAreas.map(a => ({ "@type": "Place", name: `${a.city}, ${a.region}` })) } : {}),
  } : null;
  return <>
    {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>}
    <Header/>
    <main id="conteudo">
      <Hero/>
      <ManifestoStrip/>
      {trainer.sections.about && <About/>}
      {trainer.sections.personalized && <Personalized/>}
      {trainer.sections.services && <Services/>}
      {trainer.sections.methodology && <Methodology/>}
      {trainer.sections.differentiators && <Differentiators/>}
      {trainer.sections.gallery && <Gallery/>}
      {trainer.sections.testimonials && <Testimonials/>}
      {trainer.sections.location && <Location/>}
      {trainer.sections.faq && <FAQ/>}
      <FinalCTA/>
    </main>
    <Footer/>
  </>;
}
