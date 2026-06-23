import { MapPin, MessageCircle } from "lucide-react";
import type { Ad } from "../types";
import { whatsappLink } from "../utils/whatsapp";
import { Badge } from "./Badge";
import { SafeImage } from "./SafeImage";

export function AdCard({ ad }: { ad: Ad }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <a href={`#/ads/${ad.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <SafeImage
            className={`h-full w-full ${ad.imageFit === "contain" ? "object-contain" : "object-cover"}`}
            src={ad.image}
            alt={ad.title}
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {ad.badges.map((badge) => <Badge badge={badge} key={badge} />)}
          </div>
        </div>
        <div className="space-y-3 p-4">
          <div>
            <p className="text-xs font-bold uppercase text-local">{ad.category}</p>
            <h3 className="mt-1 line-clamp-2 text-lg font-black text-ink">{ad.title}</h3>
          </div>
          <p className="line-clamp-2 text-sm leading-6 text-slate-600">{ad.description}</p>
          <p className="text-xl font-black text-ink">{ad.price}</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={16} aria-hidden />
            <span>{ad.location}</span>
          </div>
        </div>
      </a>
      <div className="flex items-center justify-between gap-3 border-t border-slate-100 p-4">
        <span className="truncate text-sm font-semibold text-slate-700">{ad.advertiser}</span>
        <a
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-green-600 text-white hover:bg-green-700"
          href={whatsappLink(ad.whatsapp, `Olá, vi o anúncio "${ad.title}" na Feira de Anúncios Club.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chamar no WhatsApp"
          title="Chamar no WhatsApp"
        >
          <MessageCircle size={20} />
        </a>
      </div>
    </article>
  );
}
