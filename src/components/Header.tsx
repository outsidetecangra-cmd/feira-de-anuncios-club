import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["Início", "#/"],
  ["Categorias", "#/ads"],
  ["Lojas", "#/stores"],
  ["Clube de Associados", "#/club"],
  ["Anunciar", "#/create"],
  ["Entrar", "#/login"],
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#/" className="flex items-center gap-3 font-black text-ink" aria-label="Feira de Anúncios Club">
          <img
            className="h-12 w-auto object-contain sm:h-14"
            src="/assets/logo-vert.png?v=3"
            alt="Feira de Anúncios"
          />
          <span className="sr-only">Feira de Anúncios Club</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100" href={href}>
              {label}
            </a>
          ))}
        </nav>

        <button
          className="btn-ghost px-3 lg:hidden"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="container-page grid gap-2 border-t border-slate-100 bg-white py-3 lg:hidden">
          {links.map(([label, href]) => (
            <a
              key={href}
              className="rounded-md px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              href={href}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
