export function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-sm font-black uppercase text-local">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-normal text-ink md:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-base leading-7 text-slate-600">{text}</p>}
    </div>
  );
}
