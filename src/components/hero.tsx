"use client";
import { m, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowDownRight } from "lucide-react";
import { trainer } from "@/data/trainer";
import { ContactButton } from "./contact";
import { HeroVideo } from "./hero-video";

export function Hero() {
  const reduceMotion = useReducedMotion();
  return <section className="hero" id="inicio" aria-labelledby="hero-heading">
    <HeroVideo/>
    <div className="hero-topline container"><span className="eyebrow"><span className="line-dot"/>{trainer.hero.eyebrow}</span>{trainer.isDemo && <span className="demo-badge">PERFIL DEMONSTRATIVO</span>}</div>
    <div className="hero-main container">
      <div className="hero-copy">
        <h1 className="hero-title display" id="hero-heading" aria-label={trainer.hero.headline.join(" ")}>{trainer.hero.headline.map((line, i) => <span className="hero-title-line" key={line}><m.span className={i === trainer.hero.highlightLine ? "text-accent" : ""} initial={false} animate={reduceMotion === false ? { y: [24, 0] } : { y: 0 }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>{line}{i === trainer.hero.headline.length - 1 && <ArrowUpRightLarge/>}</m.span></span>)}</h1>
        <m.p className="hero-description" initial={false} animate={reduceMotion === false ? { y: [15, 0] } : { y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>{trainer.hero.description}</m.p>
        <div className="hero-actions"><ContactButton>{trainer.hero.primaryCta}</ContactButton>{trainer.sections.methodology && <a className="hero-method" href="#metodo">{trainer.hero.secondaryCta}<ArrowDown size={17}/></a>}</div>
      </div>
      <div className="hero-side-note"><span className="hero-coordinate">01 / MOVIMENTO</span><ArrowDownRight size={27} strokeWidth={1}/><p>O seu objetivo.<br/>A sua jornada.</p></div>
    </div>
    <div className="hero-bottom container"><span>SEU CORPO. SEU RITMO. SUA EVOLUÇÃO.</span><a href={trainer.sections.about ? "#sobre" : "#contato"} aria-label="Explorar a página"><span>ROLE PARA DESCOBRIR</span><ArrowDown size={15}/></a></div>
  </section>;
}

function ArrowUpRightLarge() {
  return <svg className="hero-title-arrow" viewBox="0 0 90 90" fill="none" aria-hidden="true"><path d="M15 74 74 15M15 15h59v59" stroke="currentColor" strokeWidth="5"/></svg>;
}
