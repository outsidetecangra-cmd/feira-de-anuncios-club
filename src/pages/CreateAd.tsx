import { Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { categories } from "../data/categories";
import type { Ad } from "../types";

interface CreateAdProps {
  onCreate: (ad: Ad, clubLead?: { name: string; whatsapp: string }) => void;
}

export function CreateAd({ onCreate }: CreateAdProps) {
  const [createdId, setCreatedId] = useState<string | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = crypto.randomUUID();
    const title = String(form.get("title"));
    const advertiser = String(form.get("advertiser"));
    const whatsapp = String(form.get("whatsapp"));
    const joinClub = form.get("joinClub") === "on";
    const ad: Ad = {
      id,
      title,
      description: String(form.get("description")),
      price: String(form.get("price")),
      category: String(form.get("category")),
      image: String(form.get("image")),
      advertiser,
      whatsapp,
      location: String(form.get("location")),
      type: String(form.get("type")) as Ad["type"],
      status: "ativo",
      badges: joinClub ? ["associado"] : [],
      createdAt: new Date().toISOString(),
    };

    onCreate(ad, joinClub ? { name: advertiser, whatsapp } : undefined);
    setCreatedId(id);
    event.currentTarget.reset();
  }

  return (
    <main className="container-page py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-black uppercase text-local">Anunciar</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Cadastrar anúncio</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Publique produtos, serviços, imóveis, veículos e oportunidades da sua região. O anúncio aparece imediatamente na listagem do MVP.
        </p>

        <form onSubmit={submit} className="mt-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
          <input className="field md:col-span-2" name="title" placeholder="Título" required />
          <textarea className="field min-h-32 md:col-span-2" name="description" placeholder="Descrição" required />
          <input className="field" name="price" placeholder="Preço" required />
          <select className="field" name="category" required>
            {categories.map((category) => <option key={category.name}>{category.name}</option>)}
          </select>
          <input className="field md:col-span-2" name="image" type="url" placeholder="URL da imagem" required />
          <input className="field" name="advertiser" placeholder="Nome do anunciante ou loja" required />
          <input className="field" name="whatsapp" placeholder="WhatsApp com DDD" required />
          <input className="field" name="location" placeholder="Bairro/cidade" required />
          <select className="field" name="type" required>
            <option value="particular">Particular</option>
            <option value="loja">Loja</option>
          </select>
          <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700 md:col-span-2">
            <input className="h-5 w-5 accent-amber-500" type="checkbox" name="joinClub" />
            Desejo participar do clube de associados
          </label>
          <button className="btn-primary md:col-span-2" type="submit">
            <Send size={18} /> Publicar anúncio
          </button>
        </form>
        {createdId && (
          <div className="mt-5 rounded-lg bg-green-50 p-4 text-sm font-semibold text-green-700">
            Anúncio cadastrado com sucesso. <a className="underline" href={`#/ads/${createdId}`}>Ver anúncio</a>
          </div>
        )}
      </div>
    </main>
  );
}
