import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Crosshair, Focus, MoveUpRight, Route, MapPin } from "lucide-react";
import { trainer } from "@/data/trainer";
import { visibleAreas, visibleGallery, visibleTestimonials } from "@/lib/content";
import { ContactButton } from "./contact";
import { Reveal } from "./reveal";

export function ManifestoStrip() {
  return <div className="manifesto-strip" aria-label="Força, equilíbrio e constância"><div><span>FORÇA.</span><span className="strip-spark" aria-hidden="true">✳</span><span>EQUILÍBRIO.</span><span className="strip-spark" aria-hidden="true">✳</span><span>CONSTÂNCIA.</span><span className="strip-spark" aria-hidden="true">✳</span><span className="strip-extra" aria-hidden="true">MOVIMENTO.</span></div></div>;
}

export function About() {
  const { profile } = trainer;
  const credentials = trainer.credentials.filter(item => item.verified);
  return <section className="about-section section-pad" id="sobre" aria-labelledby="about-heading"><div className="container about-grid">
    <Reveal className="about-image-column"><div className="about-image-frame"><Image src={profile.image} alt={profile.imageAlt} fill sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 100vw" style={{ objectPosition: profile.imagePosition }}/><span className="image-corner">{profile.imageCaption}</span><div className="portrait-marker" aria-hidden="true"><ArrowUpRight size={40} strokeWidth={1}/></div></div><div className="image-caption"><span>01 / O LADO HUMANO DO TREINO</span><span>{trainer.initials} / PT</span></div></Reveal>
    <Reveal className="about-copy" delay={0.1}><span className="eyebrow"><span className="line-dot"/>{profile.eyebrow}</span><h2 className="display section-title" id="about-heading">{profile.headline.map((line, i) => <span key={line} className={i === profile.headline.length - 1 ? "text-olive" : ""}>{line}<br/></span>)}</h2>
      {trainer.isDemo && <span className="profile-demo-label">Caio Almeida é um personagem fictício deste modelo.</span>}
      <div className="about-prose">{profile.biography.map(p => <p key={p}>{p}</p>)}</div>
      {!!credentials.length && <ul className="credential-list">{credentials.map(item => <li key={item.text}>{item.text}</li>)}</ul>}
      <blockquote><span aria-hidden="true">“</span>{profile.philosophy}</blockquote><span className="signature">{profile.signature}</span><span className="signature-label">{trainer.professionalTitle}{trainer.isDemo ? " · perfil demonstrativo" : ""}</span>
    </Reveal>
  </div></section>;
}

export function Personalized() {
  const content = trainer.personalized;
  return <section className="personalized-section section-pad" id="para-voce" aria-labelledby="personalized-heading"><div className="container">
    <Reveal><span className="eyebrow"><span className="line-dot"/>{content.eyebrow}</span><div className="personalized-heading-row"><h2 className="display section-title" id="personalized-heading">{content.headline.map((line, i) => <span className={i === content.headline.length - 1 ? "text-accent" : ""} key={line}>{line}<br/></span>)}</h2><ArrowDownRight className="personalized-arrow" strokeWidth={0.8} aria-hidden="true"/></div></Reveal>
    <div className="personalized-details"><Reveal><p className="personalized-description">{content.description}</p><span className="small-note">PLANEJAMENTO INDIVIDUAL.<br/>PROPÓSITO EM CADA ESCOLHA.</span></Reveal><div className="pillar-list">{content.pillars.map((pillar, i) => <Reveal key={pillar.number} delay={i * 0.05} className="pillar"><span className="pillar-number">{pillar.number}</span><div><h3>{pillar.title}</h3><p>{pillar.description}</p></div><Crosshair size={22} strokeWidth={1}/></Reveal>)}</div></div>
  </div></section>;
}

export function Methodology() {
  return <section className="method-section section-pad" id="metodo" aria-labelledby="method-heading"><div className="container method-grid">
    <Reveal className="method-intro"><span className="eyebrow"><span className="line-dot"/>O MÉTODO</span><h2 className="display section-title" id="method-heading">SEM ATALHOS.<br/>COM <span className="text-olive">DIREÇÃO.</span></h2><p>Um processo claro, do primeiro contato aos ajustes do caminho. Cada etapa começa com você.</p><div className="method-diagram" aria-hidden="true"><div className="diagram-circle circle-one"/><div className="diagram-circle circle-two"/><div className="diagram-circle circle-three"/><span>VOCÊ<br/>NO CENTRO.</span><MoveUpRight size={23}/></div><span className="small-note">ESCUTAR. PLANEJAR. ACOMPANHAR.</span></Reveal>
    <ol className="method-steps">{trainer.methodology.map((step, i) => <li key={step.title}><Reveal className="method-step"><span className="step-number">{String(i + 1).padStart(2, "0")}</span><div><span className="step-eyebrow">{i === 0 ? "O PRIMEIRO PASSO" : i === trainer.methodology.length - 1 ? "O CAMINHO CONTINUA" : "PASSO A PASSO"}</span><h3>{step.title}</h3><p>{step.description}</p></div><ArrowUpRight size={21} strokeWidth={1}/></Reveal></li>)}</ol>
  </div></section>;
}

export function Differentiators() {
  const icons = [Focus, Route, Crosshair, MoveUpRight];
  return <section className="difference-section section-pad" aria-labelledby="difference-heading"><div className="container">
    <Reveal className="section-intro"><div><span className="eyebrow"><span className="line-dot"/>O QUE FAZ SENTIDO FICA</span><h2 className="display section-title" id="difference-heading">MENOS FÓRMULAS.<br/><span className="text-accent">MAIS VOCÊ.</span></h2></div><p>O cuidado está nos detalhes.<br/>E na forma de caminhar junto.</p></Reveal>
    <div className="difference-grid">{trainer.differentiators.map((item, i) => { const Icon = icons[i % icons.length]; return <Reveal className="difference-item" key={item.title} delay={i * 0.05}><Icon size={31} strokeWidth={1}/><div><h3>{item.title}</h3><p>{item.description}</p></div><span className="difference-index">0{i + 1}</span></Reveal>; })}</div>
  </div></section>;
}

export function Gallery() {
  if (!visibleGallery.length) return null;
  return <section className="gallery-section section-pad" aria-labelledby="gallery-heading"><div className="container">
    <Reveal className="section-intro"><div><span className="eyebrow"><span className="line-dot"/>POR DENTRO DO MOVIMENTO</span><h2 className="display section-title" id="gallery-heading">O TREINO ACONTECE.<br/><span className="text-olive">A VIDA ACOMPANHA.</span></h2></div><p>Intenção. Presença. Movimento.<br/>Um olhar sobre o processo.</p></Reveal>
    <div className="gallery-grid">{visibleGallery.map((item, i) => <Reveal className={`gallery-item gallery-item-${i % 3}`} key={item.image} delay={i * 0.08}><figure><div className="gallery-image"><Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 40vw, 100vw" style={{ objectPosition: item.position ?? "center" }}/><ArrowUpRight size={28} strokeWidth={1} className="gallery-image-arrow" aria-hidden="true"/></div><figcaption><span>0{i + 1} / {item.label}</span></figcaption></figure></Reveal>)}</div>
    {trainer.isDemo && <p className="gallery-note">Imagens ilustrativas extraídas dos vídeos fornecidos para esta demonstração. Não representam clientes ou resultados reais.</p>}
  </div></section>;
}

export function Testimonials() {
  if (!visibleTestimonials.length) return null;
  return <section className="testimonials-section section-pad" aria-labelledby="testimonials-heading"><div className="container"><span className="eyebrow"><span className="line-dot"/>EXPERIÊNCIAS REAIS</span><h2 className="display section-title" id="testimonials-heading">CADA HISTÓRIA<br/>TEM SEU MOVIMENTO.</h2><div className="testimonials-grid">{visibleTestimonials.map(item => <figure key={item.name}><blockquote>“{item.quote}”</blockquote><figcaption>{item.image && <Image src={item.image} width={48} height={48} alt={`Retrato autorizado de ${item.name}`}/>}<span>{item.name}{item.detail && <small>{item.detail}</small>}</span></figcaption></figure>)}</div></div></section>;
}

export function Location() {
  if (!visibleAreas.length) return null;
  return <section className="location-section section-pad" id="onde" aria-labelledby="location-heading"><div className="container"><span className="eyebrow"><span className="line-dot"/>ONDE TREINAR</span><h2 className="display section-title" id="location-heading">MOVIMENTO<br/>PERTO DE VOCÊ.</h2><ul className="location-list">{visibleAreas.map(area => <li key={`${area.city}-${area.region}`}><MapPin size={27}/><div><h3>{area.city}, {area.region}</h3>{area.location && <p>{area.location}</p>}</div>{area.mapUrl?.startsWith("https://www.google.com/maps") && <a href={area.mapUrl} target="_blank" rel="noopener noreferrer">Ver no mapa <ArrowUpRight size={18}/></a>}</li>)}</ul></div></section>;
}

export function FinalCTA() {
  return <section className="final-cta" id="contato" aria-labelledby="contact-heading"><div className="container"><Reveal><div className="final-cta-top"><span className="eyebrow"><span className="line-dot"/>{trainer.finalCta.eyebrow}</span><ArrowUpRight size={90} strokeWidth={0.8} aria-hidden="true"/></div><h2 className="display" id="contact-heading">{trainer.finalCta.headline.map(line => <span key={line}>{line}<br/></span>)}</h2><div className="final-cta-bottom"><p>{trainer.finalCta.description}</p><ContactButton variant="dark">{trainer.finalCta.button}</ContactButton></div></Reveal></div></section>;
}
