import { Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { categories } from "../data/categories";
import { SITE_WHATSAPP_PHONE } from "../utils/contact";
import { whatsappLink } from "../utils/whatsapp";

export function CreateAd() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title"));
    const advertiser = String(form.get("advertiser"));
    const whatsapp = String(form.get("whatsapp"));
    const joinClub = form.get("joinClub") === "on";
    const message = [
      "Olá, quero anunciar na Feira de Anúncios Club.",
      "",
      `Título: ${title}`,
      `Descrição: ${String(form.get("description"))}`,
      `Preço: ${String(form.get("price"))}`,
      `Categoria: ${String(form.get("category"))}`,
      `Imagem: ${String(form.get("image"))}`,
      `Anunciante/loja: ${advertiser}`,
      `WhatsApp do anunciante: ${whatsapp}`,
      `Bairro/cidade: ${String(form.get("location"))}`,
      `Tipo: ${String(form.get("type"))}`,
      `Tem interesse no clube de associados: ${joinClub ? "Sim" : "Não"}`,
    ].join("\n");

    window.open(whatsappLink(SITE_WHATSAPP_PHONE, message), "_blank", "noopener,noreferrer");
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <main className="container-page py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-black uppercase text-local">Anunciar</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Solicitar anúncio</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Preencha os dados do anúncio e envie pelo WhatsApp. Nossa equipe confere as informações antes da publicação.
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
            <Send size={18} /> Enviar solicitação pelo WhatsApp
          </button>
        </form>
        {sent && (
          <div className="mt-5 rounded-lg bg-green-50 p-4 text-sm font-semibold text-green-700">
            Solicitação preparada. Se o WhatsApp não abrir automaticamente, verifique o bloqueio de pop-ups do navegador.
          </div>
        )}
      </div>
    </main>
  );
}
