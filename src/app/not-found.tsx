import Link from "next/link";
export default function NotFound() { return <main id="conteudo" className="not-found container"><span className="eyebrow">404 / FORA DO PERCURSO</span><h1 className="display">VAMOS VOLTAR<br/>AO CAMINHO?</h1><p>A página que você procura não está aqui.</p><Link href="/" className="button button-lime">Voltar ao início ↗</Link></main>; }
