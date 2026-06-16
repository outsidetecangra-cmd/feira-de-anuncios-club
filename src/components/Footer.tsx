import { MessageCircle, ShieldCheck, Store } from "lucide-react";

export function Footer() {
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
          <p className="mt-4">MVP preparado para Cloudflare Pages.</p>
        </div>
      </div>
    </footer>
  );
}
