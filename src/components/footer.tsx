import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { trainer } from "@/data/trainer";
import { navigation } from "@/lib/content";
import { instagramUrl, whatsappUrl } from "@/lib/contact";
import { InstagramIcon } from "./icons";
import { Brand } from "./header";

export function Footer() {
  const instagram = instagramUrl(trainer.contact.instagram);
  const whatsapp = whatsappUrl(trainer.contact.whatsapp, trainer.contact.message);
  return <footer className="site-footer"><div className="container"><div className="footer-top"><div><Brand footer/><p>Movimento com propósito.<br/>Treino com a sua medida.</p></div><nav aria-label="Navegação do rodapé">{navigation.map(link => <a href={link.href} key={link.href}>{link.label}<ArrowUpRight size={13}/></a>)}</nav><div className="footer-socials">{instagram && <a href={instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon width={18} height={18}/>Instagram <ArrowUpRight size={14}/></a>}{whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={14}/></a>}{trainer.contact.email && <a href={`mailto:${trainer.contact.email}`}>{trainer.contact.email}</a>}<a className="back-top" href="#inicio">Voltar ao início <ArrowUp size={16}/></a></div></div><div className="footer-wordmark" aria-hidden="true">MOVIMENTO.</div><div className="footer-bottom"><p>© {new Date().getUTCFullYear()} {trainer.name}.{trainer.isDemo ? " Perfil fictício · site de demonstração." : " Todos os direitos reservados."}</p><Link href="/privacidade">Privacidade</Link><span>FEITO PARA IR ALÉM. <ArrowUpRight size={12}/></span></div></div></footer>;
}
