"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check } from "lucide-react";
import { trainer } from "@/data/trainer";
import { visibleServices } from "@/lib/content";
import { ContactButton } from "./contact";
import { Reveal } from "./reveal";

export function Services() {
  const [active, setActive] = useState(0);
  const service = visibleServices[active];
  if (!service) return null;
  function moveTab(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % visibleServices.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + visibleServices.length) % visibleServices.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = visibleServices.length - 1;
    else return;
    event.preventDefault(); setActive(next);
    document.getElementById(`service-tab-${next}`)?.focus();
  }
  return <section className="services-section section-pad" id="treinos" aria-labelledby="services-heading">
    <div className="container">
      <Reveal className="section-intro"><div><span className="eyebrow"><span className="line-dot"/>POSSIBILIDADES DE TREINO</span><h2 className="display section-title" id="services-heading">UM OBJETIVO.<br/><span className="text-muted-display">DIFERENTES CAMINHOS.</span></h2></div><p>O formato muda.<br/>A atenção a você, não.</p></Reveal>
      {trainer.isDemo && <p className="demo-section-note">Modalidades ilustrativas para demonstração. A oferta real será definida pelo profissional.</p>}
      <div className="service-tabs" role="tablist" aria-label="Modalidades de treino">{visibleServices.map((item, i) => <button key={item.id} id={`service-tab-${i}`} role="tab" aria-selected={active === i} aria-controls={`service-panel-${i}`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => moveTab(e, i)}><small>0{i + 1}</small><span>{item.subtitle}</span><ArrowUpRight size={18}/></button>)}</div>
      {visibleServices.map((item, i) => <div key={item.id} role="tabpanel" id={`service-panel-${i}`} aria-labelledby={`service-tab-${i}`} hidden={active !== i} tabIndex={0} className="service-panel">
        <div className="service-image"><Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1024px) 52vw, 100vw" loading="lazy"/><span className="image-corner">{trainer.isDemo ? "IMAGEM DE DEMONSTRAÇÃO" : item.subtitle.toUpperCase()}</span><span className="image-number">0{i + 1}</span></div>
        <div className="service-content"><ArrowDownRight size={40} strokeWidth={1} className="service-content-arrow"/><h3 className="display">{item.title.split("\n").map(line => <span key={line}>{line}<br/></span>)}</h3><p>{item.description}</p><ul>{item.details.map(detail => <li key={detail}><Check size={15}/>{detail}</li>)}</ul><ContactButton variant="text" icon={false}>Encontrar meu formato</ContactButton></div>
      </div>)}
    </div>
  </section>;
}
