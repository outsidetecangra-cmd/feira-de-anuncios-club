import type { AdBadge } from "../types";

const labels: Record<AdBadge, string> = {
  destaque: "Destaque",
  associado: "Associado",
  promocao: "Promoção",
};

const styles: Record<AdBadge, string> = {
  destaque: "bg-sale text-ink",
  associado: "bg-local text-white",
  promocao: "bg-rose-600 text-white",
};

export function Badge({ badge }: { badge: AdBadge }) {
  return <span className={`rounded px-2 py-1 text-[11px] font-black uppercase ${styles[badge]}`}>{labels[badge]}</span>;
}
