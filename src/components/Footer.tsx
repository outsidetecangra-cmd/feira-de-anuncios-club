import { MessageCircle, ShieldCheck, Store } from "lucide-react";
import { SITE_WHATSAPP_LABEL, SITE_WHATSAPP_PHONE } from "../utils/contact";
import { whatsappLink } from "../utils/whatsapp";
import { VisitorCounter } from "./VisitorCounter";

export function Footer() {
  const message = "Olá, quero falar com a Feira de Anúncios Club.";

  return (
    <footer className="mt-16 bg-ink text-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-black">Feira de Anúncios Club</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            Seu comércio local em uma vitrine digital. Anuncie produtos, serviços,
            imóveis, veículos e oportunidades da sua região.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-slate-300">
          <span className="flex items-center gap-2"><Store size={18} /> Multi-lojas locais</span>
          <span className="flex items-center gap-2"><ShieldCheck size={18} /> Clube de associados</span>
          <span className="flex items-center gap-2"><MessageCircle size={18} /> Contato por WhatsApp</span>
        </div>
        <div className="text-sm text-slate-300">
          <p className="font-semibold text-white">Domínio oficial</p>
          <p className="mt-2">feiradeanuncios.club</p>
          <a
            className="mt-4 inline-flex items-center gap-2 font-bold text-sale hover:text-white"
            href={whatsappLink(SITE_WHATSAPP_PHONE, message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} /> WhatsApp {SITE_WHATSAPP_LABEL}
          </a>
          <div className="mt-5 flex justify-center md:justify-end">
            <VisitorCounter />
          </div>
        </div>
      </div>
    </footer>
  );
}
