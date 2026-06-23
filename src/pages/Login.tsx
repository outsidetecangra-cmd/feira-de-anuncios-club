import { LogIn } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import {
  getMockAdminDisabledMessage,
  getMockAdminHint,
  MOCK_ADMIN_ENABLED,
  startMockAdminSession,
  validateMockAdminCredentials,
} from "../utils/mockAdmin";

export function Login({ onLogin }: { onLogin: () => void }) {
  const [error, setError] = useState("");
  const hint = getMockAdminHint();

  if (!MOCK_ADMIN_ENABLED) {
    return (
      <main className="container-page grid min-h-[calc(100vh-12rem)] place-items-center py-10">
        <div className="w-full max-w-md rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <p className="text-sm font-black uppercase text-amber-700">Admin</p>
          <h1 className="mt-2 text-3xl font-black text-ink">Painel indisponível</h1>
          <p className="mt-3 text-sm leading-6 text-slate-700">{getMockAdminDisabledMessage()}</p>
        </div>
      </main>
    );
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const user = String(form.get("user") ?? "");
    const password = String(form.get("password") ?? "");

    if (validateMockAdminCredentials(user, password)) {
      startMockAdminSession();
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
        <p className="mt-2 text-sm text-slate-600">Acesso mockado apenas para desenvolvimento e ambientes restritos.</p>
        {hint && <p className="mt-2 text-sm text-slate-600">Dev local: usuário <strong>{hint.user}</strong> / senha <strong>{hint.password}</strong>.</p>}
        <div className="mt-6 grid gap-3">
          <input autoComplete="username" className="field" maxLength={64} name="user" placeholder="Usuário" required />
          <input autoComplete="current-password" className="field" maxLength={128} name="password" placeholder="Senha" type="password" required />
          <button className="btn-primary" type="submit"><LogIn size={18} /> Entrar</button>
        </div>
        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      </form>
    </main>
  );
}
