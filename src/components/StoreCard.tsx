import { MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import type { Store } from "../types";
import { whatsappLink } from "../utils/whatsapp";
import { SafeImage } from "./SafeImage";

export function StoreCard({ store, count = 0 }: { store: Store; count?: number }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[16/9] overflow-hidden bg-slate-100">
        <SafeImage
          className={`h-full w-full ${store.imageFit === "contain" ? "object-contain" : "object-cover"}`}
          src={store.image}
          alt={store.name}
        />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase text-local">{store.category}</p>
            <h3 className="mt-1 text-lg font-black text-ink">{store.name}</h3>
          </div>
          {store.isMember && <ShieldCheck className="shrink-0 text-local" size={22} aria-label="Associado" />}
        </div>
        <p className="text-sm leading-6 text-slate-600">{store.description}</p>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} aria-hidden />
          <span>{store.address}</span>
        </div>
        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="text-sm font-semibold text-slate-700">{count} anúncio(s)</span>
          <a className="btn-ghost" href={whatsappLink(store.whatsapp, `Olá, encontrei a ${store.name} na Feira de Anúncios Club.`)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} /> WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
