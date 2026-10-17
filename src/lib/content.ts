import { trainer } from "@/data/trainer";

export const visibleServices = trainer.services.filter(s => s.enabled && (trainer.isDemo || s.verified));
export const visibleGallery = trainer.gallery.filter(item => trainer.isDemo || item.approved);
export const visibleTestimonials = trainer.testimonials.filter(item => item.authorized);
export const visibleAreas = trainer.serviceAreas.filter(item => item.verified);
export const navigation = [
  ...(trainer.sections.about ? [{ label: "O treinador", href: "#sobre" }] : []),
  ...(trainer.sections.services && visibleServices.length ? [{ label: "Treinos", href: "#treinos" }] : []),
  ...(trainer.sections.methodology ? [{ label: "O método", href: "#metodo" }] : []),
  ...(trainer.sections.faq ? [{ label: "Dúvidas", href: "#duvidas" }] : []),
];
