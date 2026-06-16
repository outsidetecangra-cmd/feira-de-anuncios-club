import { AdCard } from "../components/AdCard";
import { StoreCard } from "../components/StoreCard";
import { mockStores } from "../data/mockStores";
import type { Ad } from "../types";

export function Stores({ ads }: { ads: Ad[] }) {
  return (
    <main className="container-page py-10">
      <div className="mb-8">
        <p className="text-sm font-black uppercase text-local">Multi-lojas</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Lojas participantes</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {mockStores.map((store) => {
          const storeAds = ads.filter((ad) => ad.storeId === store.id && ad.status === "ativo");
          return (
            <section className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={store.id}>
              <StoreCard store={store} count={storeAds.length} />
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {storeAds.map((ad) => <AdCard ad={ad} key={ad.id} />)}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
