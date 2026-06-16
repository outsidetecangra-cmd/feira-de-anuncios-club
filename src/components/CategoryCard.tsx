import type { Category } from "../types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <a href={`#/ads?category=${encodeURIComponent(category.name)}`} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <span className="text-3xl" aria-hidden>{category.icon}</span>
      <h3 className="mt-3 font-black text-ink">{category.name}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-600">{category.description}</p>
    </a>
  );
}
