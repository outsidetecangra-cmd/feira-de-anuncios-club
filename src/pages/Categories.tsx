import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdCard } from "../components/AdCard";
import { CategoryCard } from "../components/CategoryCard";
import { SectionTitle } from "../components/SectionTitle";
import { categories } from "../data/categories";
import type { Ad } from "../types";

export function Categories({ ads }: { ads: Ad[] }) {
  const hash = window.location.hash;
  const params = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState(params.get("category") ?? "Todas");

  useEffect(() => {
    const nextParams = new URLSearchParams(hash.split("?")[1] ?? "");
    setCategory(nextParams.get("category") ?? "Todas");
  }, [hash]);

  const filtered = useMemo(() => {
    return ads
      .filter((ad) => ad.status === "ativo")
      .filter((ad) => category === "Todas" || ad.category === category)
      .filter((ad) => `${ad.title} ${ad.description} ${ad.location}`.toLowerCase().includes(term.toLowerCase()));
  }, [ads, category, term]);

  return (
    <main className="container-page py-10">
      <div className="mb-8">
        <p className="text-sm font-black uppercase text-local">Categorias</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Encontre o que movimenta sua cidade</h1>
      </div>

      <section className="mb-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((item) => (
            <CategoryCard category={item} key={item.name} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Classificados"
          title="Anúncios da região"
          text="Use a busca ou escolha uma categoria para localizar produtos, serviços e oportunidades."
        />
        <div className="mb-8 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-[1fr_260px]">
          <label className="relative">
            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} aria-hidden />
            <input
              className="field pl-10"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Buscar por produto, serviço ou bairro"
            />
          </label>
          <select className="field" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option>Todas</option>
            {categories.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((ad) => (
            <AdCard ad={ad} key={ad.id} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="rounded-lg bg-white p-8 text-center text-slate-600">Nenhum anúncio encontrado.</p>
        )}
      </section>
    </main>
  );
}
