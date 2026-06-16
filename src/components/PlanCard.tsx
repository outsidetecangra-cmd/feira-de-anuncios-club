import { CheckCircle2 } from "lucide-react";

interface PlanCardProps {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export function PlanCard({ name, price, features, highlighted }: PlanCardProps) {
  return (
    <article className={`rounded-lg border p-5 shadow-sm ${highlighted ? "border-sale bg-amber-50" : "border-slate-200 bg-white"}`}>
      <h3 className="text-xl font-black text-ink">{name}</h3>
      <p className="mt-2 text-3xl font-black text-ink">{price}</p>
      <ul className="mt-5 grid gap-3 text-sm text-slate-700">
        {features.map((feature) => (
          <li className="flex gap-2" key={feature}>
            <CheckCircle2 className="mt-0.5 shrink-0 text-local" size={18} aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a className={highlighted ? "btn-primary mt-6 w-full" : "btn-ghost mt-6 w-full"} href="#/club">
        Quero ser associado
      </a>
    </article>
  );
}
