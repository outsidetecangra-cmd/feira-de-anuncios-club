const ADMIN_SESSION_KEY = "feira_admin_session";
const ADMIN_SESSION_TTL_MS = 30 * 60 * 1000;
const DEFAULT_DEV_USER = "admin";
const DEFAULT_DEV_PASSWORD = "admin123";

const env = import.meta.env;
const explicitlyEnabled = env.DEV || env.VITE_ENABLE_MOCK_ADMIN === "true";
const configuredUser = env.VITE_MOCK_ADMIN_USER?.trim();
const configuredPassword = env.VITE_MOCK_ADMIN_PASSWORD?.trim();
const credentialsReady = env.DEV || (!!configuredUser && !!configuredPassword);

interface AdminSession {
  authenticated: true;
  expiresAt: number;
}

function getExpectedCredentials() {
  return {
    user: configuredUser || DEFAULT_DEV_USER,
    password: configuredPassword || DEFAULT_DEV_PASSWORD,
  };
}

export const MOCK_ADMIN_ENABLED = explicitlyEnabled && credentialsReady;

export function getMockAdminDisabledMessage() {
  if (!explicitlyEnabled) {
    return "Painel mockado desabilitado em produção por padrão. Reative apenas em ambiente restrito e atrás de autenticação real, como Cloudflare Access.";
  }

  return "Painel mockado bloqueado porque as credenciais de ambiente não foram configuradas.";
}

export function getMockAdminHint() {
  if (!env.DEV) {
    return null;
  }

  return getExpectedCredentials();
}

export function validateMockAdminCredentials(user: string, password: string) {
  if (!MOCK_ADMIN_ENABLED) {
    return false;
  }

  const expected = getExpectedCredentials();
  return user === expected.user && password === expected.password;
}

export function readMockAdminSession() {
  if (!MOCK_ADMIN_ENABLED) {
    clearMockAdminSession();
    return false;
  }

  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) {
      return false;
    }

    const parsed = JSON.parse(raw) as Partial<AdminSession>;
    if (parsed.authenticated !== true || typeof parsed.expiresAt !== "number" || parsed.expiresAt <= Date.now()) {
      clearMockAdminSession();
      return false;
    }

    return true;
  } catch {
    clearMockAdminSession();
    return false;
  }
}

export function startMockAdminSession() {
  if (!MOCK_ADMIN_ENABLED) {
    return;
  }

  const session: AdminSession = {
    authenticated: true,
    expiresAt: Date.now() + ADMIN_SESSION_TTL_MS,
  };

  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function clearMockAdminSession() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
