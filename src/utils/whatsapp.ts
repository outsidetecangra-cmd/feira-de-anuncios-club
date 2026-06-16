export function cleanPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function whatsappLink(phone: string, message: string) {
  return `https://wa.me/${cleanPhone(phone)}?text=${encodeURIComponent(message)}`;
}
