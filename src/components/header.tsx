"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { trainer } from "@/data/trainer";
import { navigation } from "@/lib/content";
import { BrandMark } from "./icons";
import { ContactButton } from "./contact";

export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link className={`brand ${footer ? "brand-footer" : ""}`} href="/#inicio" aria-label={`${trainer.name} — início`}>
    <BrandMark className="brand-mark"/><span className="brand-words"><strong>{trainer.firstName}<br/>{trainer.lastName}</strong><span>{trainer.professionalTitle}</span></span>
  </Link>;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contactFromMenu = useRef(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (mq.matches) menuRef.current?.close(); };
    mq.addEventListener("change", closeOnDesktop);
    return () => mq.removeEventListener("change", closeOnDesktop);
  }, []);
  function closeMenu() { menuRef.current?.close(); }
  return <>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner container">
        <Brand/>
        <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
        <ContactButton className="header-contact" variant="outline" icon={false}>Vamos conversar</ContactButton>
        <button ref={triggerRef} className="menu-toggle icon-button" aria-label="Abrir menu de navegação" aria-haspopup="dialog" onClick={() => { menuRef.current?.showModal(); document.body.style.overflow = "hidden"; }}><Menu size={25}/></button>
      </div>
    </header>
    <dialog ref={menuRef} className="mobile-menu" aria-label="Menu de navegação" onClose={() => { if (!contactFromMenu.current) { document.body.style.overflow = ""; triggerRef.current?.focus(); } contactFromMenu.current = false; }}>
      <div className="mobile-menu-top"><Brand/><button className="icon-button" onClick={closeMenu} aria-label="Fechar menu"><X size={26}/></button></div>
      <span className="eyebrow muted">CADA MOVIMENTO TEM UM COMEÇO.</span>
      <nav aria-label="Navegação móvel">{navigation.map((link, i) => <a href={link.href} key={link.href} onClick={closeMenu}><small>0{i + 1}</small>{link.label}<ArrowUpRight size={25}/></a>)}</nav>
      <ContactButton onClick={() => { contactFromMenu.current = true; closeMenu(); }}>Vamos conversar</ContactButton>
      {trainer.isDemo && <p className="mobile-demo">Perfil fictício · site de demonstração</p>}
    </dialog>
  </>;
}
