import type { FormEvent } from "react";
import { useState } from "react";
import { PlanCard } from "../components/PlanCard";
import { addClubLead } from "../utils/storage";

export function Club() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    addClubLead({
      id: crypto.randomUUID(),
      name: String(form.get("name")),
      whatsapp: String(form.get("whatsapp")),
      source: "Clube de Associados",
      createdAt: new Date().toISOString(),
    });
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <main>
      <section className="bg-ink py-14 text-white">
        <div className="container-page max-w-4xl">
          <p className="text-sm font-black uppercase text-sale">Clube de Associados</p>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">Mais alcance para lojas e profissionais locais</h1>
          <p className="mt-5 text-lg leading-8 text-slate-200">
            Tenha anúncios em destaque, página exclusiva da loja, maior visibilidade,
            selo de associado, divulgação em campanhas locais e prioridade nos destaques.
          </p>
        </div>
      </section>
      <section className="container-page grid gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5 md:grid-cols-3">
          <PlanCard name="Básico" price="R$ 29" features={["Selo de associado", "Página exclusiva", "Até 5 anúncios"]} />
          <PlanCard name="Destaque" price="R$ 59" highlighted features={["Anúncios em destaque", "Campanhas locais", "Maior visibilidade"]} />
          <PlanCard name="Premium" price="R$ 99" features={["Prioridade nos destaques", "Mais anúncios", "Divulgação reforçada"]} />
        </div>
        <form onSubmit={submit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black text-ink">Quero ser associado</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Deixe seus dados para aparecer no painel admin como interessado.</p>
          <div className="mt-5 grid gap-3">
            <input className="field" name="name" placeholder="Nome da loja ou responsável" required />
            <input className="field" name="whatsapp" placeholder="WhatsApp" required />
            <button className="btn-primary" type="submit">Quero ser associado</button>
          </div>
          {sent && <p className="mt-4 rounded-md bg-green-50 p-3 text-sm font-semibold text-green-700">Interesse registrado com sucesso.</p>}
        </form>
      </section>
    </main>
  );
}
