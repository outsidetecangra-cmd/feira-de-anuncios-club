import { LogIn } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

export function Login({ onLogin }: { onLogin: () => void }) {
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("user") === "admin" && form.get("password") === "admin123") {
      localStorage.setItem("feira_admin", "true");
      onLogin();
      window.location.hash = "#/admin";
      return;
    }
    setError("Usuário ou senha inválidos.");
  }

  return (
    <main className="container-page grid min-h-[calc(100vh-12rem)] place-items-center py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase text-local">Admin</p>
        <h1 className="mt-2 text-3xl font-black text-ink">Entrar no painel</h1>
        <p className="mt-2 text-sm text-slate-600">Acesso mockado para MVP. Usuário: admin / Senha: admin123.</p>
        <div className="mt-6 grid gap-3">
          <input className="field" name="user" placeholder="Usuário" required />
          <input className="field" name="password" placeholder="Senha" type="password" required />
          <button className="btn-primary" type="submit"><LogIn size={18} /> Entrar</button>
        </div>
        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      </form>
    </main>
  );
}
