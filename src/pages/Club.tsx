import type { FormEvent } from "react";
import { useState } from "react";
import { PlanCard } from "../components/PlanCard";
import { SITE_WHATSAPP_PHONE } from "../utils/contact";
import { whatsappLink } from "../utils/whatsapp";

export function Club() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Olá, quero ser associado da Feira de Anúncios Club.",
      "",
      `Nome da loja ou responsável: ${String(form.get("name"))}`,
      `WhatsApp: ${String(form.get("whatsapp"))}`,
    ].join("\n");

    window.open(whatsappLink(SITE_WHATSAPP_PHONE, message), "_blank", "noopener,noreferrer");
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
            Os valores são informados somente após o cadastro e contato de negociação com o administrador.
          </p>
        </div>
      </section>
      <section className="container-page grid gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5 md:grid-cols-3">
          <PlanCard
            name="Básico"
            note="Benefícios essenciais para começar no clube."
            features={["Selo de associado", "Página exclusiva", "Publicação de anúncios"]}
          />
          <PlanCard
            name="Destaque"
            note="Mais visibilidade para vender com frequência."
            highlighted
            features={["Anúncios em destaque", "Campanhas locais", "Maior visibilidade"]}
          />
          <PlanCard
            name="Premium"
            note="Prioridade e divulgação reforçada para associados."
            features={["Prioridade nos destaques", "Mais anúncios", "Divulgação reforçada"]}
          />
        </div>
        <form onSubmit={submit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black text-ink">Quero ser associado</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Deixe seus dados e fale com a equipe pelo WhatsApp para receber uma proposta negociada.
          </p>
          <div className="mt-5 grid gap-3">
            <input className="field" name="name" placeholder="Nome da loja ou responsável" required />
            <input className="field" name="whatsapp" placeholder="WhatsApp" required />
            <button className="btn-primary" type="submit">Quero ser associado</button>
          </div>
          {sent && <p className="mt-4 rounded-md bg-green-50 p-3 text-sm font-semibold text-green-700">Solicitação preparada no WhatsApp.</p>}
        </form>
      </section>
    </main>
  );
}
