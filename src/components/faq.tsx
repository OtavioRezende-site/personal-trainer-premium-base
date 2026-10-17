"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { trainer } from "@/data/trainer";
import { ContactButton } from "./contact";
import { Reveal } from "./reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <section className="faq-section section-pad" id="duvidas" aria-labelledby="faq-heading"><div className="container faq-layout">
    <Reveal className="faq-intro"><span className="eyebrow"><span className="line-dot"/>ANTES DO PRIMEIRO PASSO</span><h2 className="display section-title" id="faq-heading">BOAS PERGUNTAS.<br/><span className="text-muted-display">CONVERSA ABERTA.</span></h2><p>Começar fica mais simples<br/>quando você sabe o caminho.</p><ContactButton variant="text" icon={false}>Ficou com alguma dúvida?</ContactButton></Reveal>
    <div className="faq-list">{trainer.faq.map((item, i) => <div key={item.question} className={`faq-item ${open === i ? "is-open" : ""}`}><h3><button id={`faq-button-${i}`} aria-expanded={open === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpen(open === i ? null : i)}><span className="faq-index">0{i + 1}</span><span>{item.question}</span><Plus size={19}/></button></h3><div className="faq-answer" id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-button-${i}`} hidden={open !== i}><p>{item.answer}</p></div></div>)}</div>
  </div></section>;
}
