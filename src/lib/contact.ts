/** Only validated Brazilian E.164 numbers become external WhatsApp links. */
export function whatsappUrl(phone: string | null, message: string): string | null {
  if (!phone) return null;
  const digits = phone.replace(/[\s()+.-]/g, "");
  if (!/^55[1-9]\d(?:9\d{8}|[2-5]\d{7})$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function instagramUrl(handle: string | null): string | null {
  if (!handle) return null;
  const clean = handle.replace(/^@/, "");
  return /^[a-zA-Z0-9._]{1,30}$/.test(clean) ? `https://www.instagram.com/${clean}/` : null;
}
