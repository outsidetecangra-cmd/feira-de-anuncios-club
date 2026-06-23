import { MessageCircle, Share2 } from "lucide-react";
import { AdCard } from "../components/AdCard";
import { Badge } from "../components/Badge";
import { SafeImage } from "../components/SafeImage";
import type { Ad } from "../types";
import { whatsappLink } from "../utils/whatsapp";

export function AdDetails({ ads, id }: { ads: Ad[]; id: string }) {
  const ad = ads.find((item) => item.id === id);

  if (!ad) {
    return (
      <main className="container-page py-16">
        <h1 className="text-3xl font-black">Anúncio não encontrado</h1>
        <a className="btn-primary mt-6" href="#/ads">Voltar para anúncios</a>
      </main>
    );
  }

  const currentAd = ad;
  const related = ads.filter((item) => item.id !== ad.id && item.category === ad.category && item.status === "ativo").slice(0, 4);

  async function share() {
    const url = `${window.location.origin}${window.location.pathname}#/ads/${currentAd.id}`;
    if (navigator.share) {
      await navigator.share({ title: currentAd.title, text: currentAd.description, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    alert("Link do anúncio copiado.");
  }

  return (
    <main className="container-page py-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <SafeImage
            className={`aspect-[4/3] w-full ${ad.imageFit === "contain" ? "object-contain" : "object-cover"}`}
            src={ad.image}
            alt={ad.title}
          />
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {ad.badges.map((badge) => <Badge badge={badge} key={badge} />)}
          </div>
          <p className="mt-5 text-sm font-black uppercase text-local">{ad.category}</p>
          <h1 className="mt-2 text-3xl font-black text-ink md:text-4xl">{ad.title}</h1>
          <p className="mt-4 text-3xl font-black text-ink">{ad.price}</p>
          <p className="mt-5 leading-7 text-slate-600">{ad.description}</p>
          <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
            <p><strong>Anunciante:</strong> {ad.advertiser}</p>
            <p className="mt-2"><strong>Cidade/bairro:</strong> {ad.location}</p>
            <p className="mt-2"><strong>Tipo:</strong> {ad.type === "loja" ? "Loja" : "Particular"}</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700" href={whatsappLink(ad.whatsapp, `Olá, vi o anúncio "${ad.title}" na Feira de Anúncios Club.`)} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} /> Chamar no WhatsApp
            </a>
            <button className="btn-ghost" type="button" onClick={() => void share()}>
              <Share2 size={18} /> Compartilhar anúncio
            </button>
          </div>
        </div>
      </div>
      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-black text-ink">Anúncios relacionados</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => <AdCard ad={item} key={item.id} />)}
        </div>
      </section>
    </main>
  );
}
