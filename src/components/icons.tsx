import type { SVGProps } from "react";

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.6Z"/><path d="m8.6 7.4 1.1 2.2-.9 1.1a8 8 0 0 0 3.6 3.5l1.1-1 2.2 1.1c.4.2.5.5.3.9-.5 1.2-1.4 1.5-2.5 1.2-3.6-1-6.2-3.5-7.1-7.1-.2-.9.3-1.8 1.2-2.2.4-.2.8-.1 1 .3Z"/></svg>;
}

export function BrandMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true"><path d="M4 35 17 9h10L14 35H4Z" fill="currentColor"/><path d="m23 26 5-10 12 19H29l-6-9Z" fill="currentColor"/><path d="M23 32h5l2 3h-9l2-3Z" fill="currentColor"/></svg>;
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>;
}
