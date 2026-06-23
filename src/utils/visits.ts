const VISIT_LOCK_KEY = "feira-de-anuncios:last-visit-at";
const VISIT_CACHE_KEY = "feira-de-anuncios:last-known-visits";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

type VisitResponse = {
  visits?: number;
};

function readNumber(value: string | null) {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function shouldCountVisit() {
  if (typeof window === "undefined") {
    return false;
  }

  const lastVisitAt = readNumber(window.localStorage.getItem(VISIT_LOCK_KEY));

  if (lastVisitAt === null) {
    return true;
  }

  return Date.now() - lastVisitAt >= ONE_DAY_MS;
}

export function markVisitCounted() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(VISIT_LOCK_KEY, String(Date.now()));
}

export function cacheVisits(value: number) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(VISIT_CACHE_KEY, String(value));
}

export function readCachedVisits() {
  if (typeof window === "undefined") {
    return null;
  }

  return readNumber(window.localStorage.getItem(VISIT_CACHE_KEY));
}

export async function loadVisits() {
  const response = await fetch("/api/visits", {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar visitas");
  }

  const data = (await response.json()) as VisitResponse;
  const visits = Number(data.visits);

  if (!Number.isFinite(visits)) {
    throw new Error("Resposta de visitas inválida");
  }

  return visits;
}

export async function countVisitIfNeeded() {
  if (!shouldCountVisit()) {
    return loadVisits();
  }

  const response = await fetch("/api/visits", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao registrar visita");
  }

  const data = (await response.json()) as VisitResponse;
  const visits = Number(data.visits);

  if (!Number.isFinite(visits)) {
    throw new Error("Resposta de visitas inválida");
  }

  markVisitCounted();
  return visits;
}
