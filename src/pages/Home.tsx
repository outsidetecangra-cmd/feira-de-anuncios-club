import { ChevronLeft, ChevronRight, Megaphone, ShieldCheck, Store, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { AdCard } from "../components/AdCard";
import { CategoryCard } from "../components/CategoryCard";
import { PlanCard } from "../components/PlanCard";
import { SectionTitle } from "../components/SectionTitle";
import { StoreCard } from "../components/StoreCard";
import { categories } from "../data/categories";
import { mockStores } from "../data/mockStores";
import type { Ad } from "../types";

const carouselImages = ["/carrossel/1.png", "/carrossel/2.png", "/carrossel/3.png"];

export function Home({ ads }: { ads: Ad[] }) {
  const activeAds = ads.filter((ad) => ad.status === "ativo");
  const featured = activeAds.filter((ad) => ad.badges.includes("destaque")).slice(0, 4);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((index) => (index + 1) % carouselImages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  function goToSlide(index: number) {
    setCurrentSlide(index);
  }

  function goToPrevious() {
    setCurrentSlide((index) => (index - 1 + carouselImages.length) % carouselImages.length);
  }

  function goToNext() {
    setCurrentSlide((index) => (index + 1) % carouselImages.length);
  }

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-100">
        <div className="container-page pb-4 pt-1 sm:pb-6 sm:pt-2">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-soft">
            <div className="relative aspect-[16/9] min-h-[220px] bg-slate-100 sm:min-h-[320px] lg:min-h-[420px]">
              {carouselImages.map((image, index) => (
                <img
                  key={image}
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                  src={image}
                  alt={`Destaque ${index + 1} da Feira de Anúncios`}
                />
              ))}
            </div>

            <button
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-white"
              type="button"
              aria-label="Imagem anterior"
              onClick={goToPrevious}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-white"
              type="button"
              aria-label="Próxima imagem"
              onClick={goToNext}
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/20 px-3 py-2 backdrop-blur-sm">
              {carouselImages.map((image, index) => (
                <button
                  key={image}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                  type="button"
                  aria-label={`Ir para imagem ${index + 1}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="container-page grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-bold text-amber-200">
              <TrendingUp size={18} /> Comércio local em destaque
            </p>
            <h1 className="mt-6 text-4xl font-black tracking-normal md:text-6xl">
              Compre, venda e anuncie no comércio local da sua região
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-200">
              Feira de Anúncios Club conecta clientes, lojas e associados em um só lugar.
              Anuncie produtos, serviços, imóveis, veículos e oportunidades da sua região.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="btn-primary" href="#/ads"><Megaphone size={20} /> Ver anúncios</a>
              <a className="btn-secondary" href="#/create"><Store size={20} /> Quero anunciar</a>
            </div>
          </div>
          <div className="grid gap-4">
            {activeAds.slice(0, 3).map((ad) => (
              <a key={ad.id} href={`#/ads/${ad.id}`} className="grid grid-cols-[96px_1fr] gap-4 rounded-lg bg-white p-3 text-ink shadow-soft">
                <img className="h-24 w-24 rounded-md object-cover" src={ad.image} alt={ad.title} />
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase text-local">{ad.category}</p>
                  <h2 className="mt-1 truncate font-black">{ad.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{ad.location}</p>
                  <p className="mt-2 font-black">{ad.price}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionTitle eyebrow="Categorias" title="Encontre o que movimenta sua cidade" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => <CategoryCard category={category} key={category.name} />)}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-page">
          <SectionTitle eyebrow="Destaques" title="Anúncios em destaque" text="Produtos, serviços e oportunidades selecionadas para vender mais rápido." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((ad) => <AdCard ad={ad} key={ad.id} />)}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionTitle eyebrow="Lojas" title="Lojas participantes" text="Vitrines locais com contato direto e anúncios reunidos em um só lugar." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {mockStores.map((store) => <StoreCard store={store} count={ads.filter((ad) => ad.storeId === store.id).length} key={store.id} />)}
        </div>
      </section>

      <section className="bg-slate-100 py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle eyebrow="Clube de Associados" title="Mais visibilidade para quem vende todos os dias" text="Anúncios em destaque, página exclusiva da loja, selo de associado e prioridade nas campanhas locais." />
            <a className="btn-primary" href="#/club"><ShieldCheck size={20} /> Conhecer planos</a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <PlanCard name="Básico" price="R$ 29" features={["Selo de associado", "Página da loja", "Suporte por WhatsApp"]} />
            <PlanCard name="Destaque" price="R$ 59" highlighted features={["Anúncios em destaque", "Maior visibilidade", "Campanhas locais"]} />
            <PlanCard name="Premium" price="R$ 99" features={["Prioridade nos destaques", "Mais anúncios", "Divulgação reforçada"]} />
          </div>
        </div>
      </section>
    </>
  );
}
