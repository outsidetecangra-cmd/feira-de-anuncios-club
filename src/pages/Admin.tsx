import { Eye, EyeOff, Star, Trash2, Users } from "lucide-react";
import type { Ad, ClubLead } from "../types";
import { getMockAdminDisabledMessage, MOCK_ADMIN_ENABLED } from "../utils/mockAdmin";

interface AdminProps {
  ads: Ad[];
  leads: ClubLead[];
  isLogged: boolean;
  onUpdate: (ads: Ad[]) => void;
  onLogout: () => void;
}

export function Admin({ ads, leads, isLogged, onUpdate, onLogout }: AdminProps) {
  if (!MOCK_ADMIN_ENABLED) {
    return (
      <main className="container-page py-16">
        <h1 className="text-3xl font-black text-ink">Acesso administrativo</h1>
        <p className="mt-3 max-w-2xl text-slate-600">{getMockAdminDisabledMessage()}</p>
      </main>
    );
  }

  if (!isLogged) {
    return (
      <main className="container-page py-16">
        <h1 className="text-3xl font-black text-ink">Acesso administrativo</h1>
        <p className="mt-3 text-slate-600">Faça login para gerenciar os anúncios.</p>
        <a className="btn-primary mt-6" href="#/login">Entrar</a>
      </main>
    );
  }

  function patchAd(id: string, update: (ad: Ad) => Ad) {
    onUpdate(ads.map((ad) => (ad.id === id ? update(ad) : ad)));
  }

  function toggleBadge(id: string, badge: "destaque" | "associado") {
    patchAd(id, (ad) => ({
      ...ad,
      badges: ad.badges.includes(badge) ? ad.badges.filter((item) => item !== badge) : [...ad.badges, badge],
    }));
  }

  return (
    <main className="container-page py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase text-local">Painel admin</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Gerenciar anúncios</h1>
        </div>
        <button className="btn-ghost" type="button" onClick={onLogout}>Sair</button>
      </div>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase text-slate-600">
              <tr>
                <th className="px-4 py-3">Anúncio</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Loja/anunciante</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Selos</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ads.map((ad) => (
                <tr key={ad.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img className="h-12 w-12 rounded object-cover" src={ad.image} alt="" />
                      <div>
                        <p className="font-bold text-ink">{ad.title}</p>
                        <p className="text-slate-500">{ad.price}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{ad.category}</td>
                  <td className="px-4 py-3">{ad.advertiser}</td>
                  <td className="px-4 py-3">
                    <span className={ad.status === "ativo" ? "font-bold text-green-700" : "font-bold text-slate-500"}>{ad.status}</span>
                  </td>
                  <td className="px-4 py-3">{ad.badges.join(", ") || "Sem selo"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button className="btn-ghost px-3" type="button" title="Ativar/desativar" onClick={() => patchAd(ad.id, (item) => ({ ...item, status: item.status === "ativo" ? "inativo" : "ativo" }))}>
                        {ad.status === "ativo" ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button className="btn-ghost px-3" type="button" title="Marcar como destaque" onClick={() => toggleBadge(ad.id, "destaque")}>
                        <Star size={16} />
                      </button>
                      <button className="btn-ghost px-3" type="button" title="Marcar como associado" onClick={() => toggleBadge(ad.id, "associado")}>
                        <Users size={16} />
                      </button>
                      <button className="btn-ghost px-3 text-red-600" type="button" title="Excluir" onClick={() => onUpdate(ads.filter((item) => item.id !== ad.id))}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black text-ink">Lojas cadastradas</h2>
          <p className="mt-3 text-sm text-slate-600">As lojas iniciais estão nos dados mockados e podem migrar para banco real depois.</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black text-ink">Interessados no clube</h2>
          <div className="mt-4 grid gap-3">
            {leads.length === 0 && <p className="text-sm text-slate-600">Nenhum interessado registrado.</p>}
            {leads.map((lead) => (
              <div className="rounded-md bg-slate-50 p-3 text-sm" key={lead.id}>
                <p className="font-bold text-ink">{lead.name}</p>
                <p className="text-slate-600">{lead.whatsapp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
