"use client";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import { trainer } from "@/data/trainer";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "./icons";

const ContactContext = createContext<() => void>(() => {});

export function ContactProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  function open() {
    opener.current = document.activeElement as HTMLElement;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }
  function close() { dialog.current?.close(); }
  return <ContactContext.Provider value={open}>
    {children}
    <dialog ref={dialog} className="contact-dialog" aria-labelledby="contact-title" onClose={() => { document.body.style.overflow = ""; opener.current?.focus(); }} onClick={e => { if (e.target === e.currentTarget) close(); }}>
      <div className="contact-dialog-inner">
        <button onClick={close} className="icon-button dialog-close" aria-label="Fechar contato"><X size={22}/></button>
        <span className="eyebrow"><span className="status-dot"/> {trainer.isDemo ? "VOCÊ ESTÁ EM UMA DEMONSTRAÇÃO" : "CONTATO EM BREVE"}</span>
        <ArrowDownRight className="contact-dialog-arrow" size={66} strokeWidth={1}/>
        <h2 id="contact-title" className="display">UMA BOA CONVERSA.<br/><span className="text-accent">UM NOVO COMEÇO.</span></h2>
        <p>{trainer.isDemo ? "Este é um perfil fictício para apresentar a experiência do site. Nenhuma mensagem será enviada e nenhum dado será coletado." : "O contato deste profissional ainda não está disponível por aqui. Volte em breve para conversar sobre o seu treino."}</p>
        {trainer.isDemo && <p className="contact-note">O WhatsApp será ativado quando o contato real do profissional for cadastrado.</p>}
        <a className="button button-lime" href={trainer.sections.methodology ? "#metodo" : "#inicio"} onClick={close}>Continuar explorando <ArrowUpRight size={19}/></a>
      </div>
    </dialog>
  </ContactContext.Provider>;
}

export function ContactButton({ children, className = "", variant = "lime", icon = true, onClick }: { children: ReactNode; className?: string; variant?: "lime" | "outline" | "dark" | "text"; icon?: boolean; onClick?: () => void }) {
  const open = useContext(ContactContext);
  const href = whatsappUrl(trainer.contact.whatsapp, trainer.contact.message);
  const content = <>{icon && <WhatsAppIcon className="whatsapp-icon"/>}<span>{children}</span><ArrowUpRight className="button-arrow" size={19}/></>;
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={`button button-${variant} ${className}`} onClick={onClick} aria-label={`${typeof children === "string" ? children : "Conversar"} pelo WhatsApp (abre em nova aba)`}>{content}</a>
    : <button type="button" className={`button button-${variant} ${className}`} onClick={() => { onClick?.(); open(); }} aria-haspopup="dialog">{content}</button>;
}
