import type { Ad, AdBadge, ClubLead } from "../types";

const FALLBACK_IMAGE = "/assets/logo-vert.png?v=3";
const MAX_ADS = 200;
const MAX_LEADS = 200;
const ALLOWED_IMAGE_HOSTS = new Set(["images.unsplash.com"]);
const ALLOWED_BADGES: AdBadge[] = ["associado", "destaque", "promocao"];

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function normalizeDate(value: unknown) {
  if (typeof value !== "string") {
    return new Date().toISOString();
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? new Date().toISOString() : new Date(timestamp).toISOString();
}

function normalizeSlug(value: unknown, fallback: string) {
  const cleaned = normalizeText(value, 120)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned || fallback;
}

function normalizeWhatsapp(value: unknown) {
  const digits = typeof value === "string" ? value.replace(/\D/g, "") : "";
  return digits.length >= 10 && digits.length <= 15 ? digits : "";
}

function normalizeBadges(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as AdBadge[];
  }

  return [...new Set(value.filter((badge): badge is AdBadge => ALLOWED_BADGES.includes(badge as AdBadge)))];
}

export function sanitizeImageUrl(value: unknown) {
  if (typeof value !== "string") {
    return FALLBACK_IMAGE;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return FALLBACK_IMAGE;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed, window.location.origin);
    if (url.origin === window.location.origin) {
      return url.toString();
    }

    if (url.protocol === "https:" && ALLOWED_IMAGE_HOSTS.has(url.hostname)) {
      return url.toString();
    }
  } catch {
    return FALLBACK_IMAGE;
  }

  return FALLBACK_IMAGE;
}

function sanitizeAd(value: unknown, index: number): Ad | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Partial<Ad>;
  const title = normalizeText(record.title, 120);
  const description = normalizeText(record.description, 1200);
  const category = normalizeText(record.category, 80);
  const price = normalizeText(record.price, 40);
  const advertiser = normalizeText(record.advertiser, 120);
  const whatsapp = normalizeWhatsapp(record.whatsapp);
  const location = normalizeText(record.location, 120);
  const type = record.type === "loja" ? "loja" : record.type === "particular" ? "particular" : null;
  const status = record.status === "inativo" ? "inativo" : record.status === "ativo" ? "ativo" : null;

  if (!title || !description || !category || !price || !advertiser || !whatsapp || !location || !type || !status) {
    return null;
  }

  return {
    id: normalizeSlug(record.id, `anuncio-${index + 1}`),
    title,
    description,
    category,
    price,
    image: sanitizeImageUrl(record.image),
    imageFit: record.imageFit === "contain" ? "contain" : "cover",
    advertiser,
    whatsapp,
    location,
    status,
    badges: normalizeBadges(record.badges),
    storeId: normalizeText(record.storeId, 120) || undefined,
    type,
    createdAt: normalizeDate(record.createdAt),
  };
}

function sanitizeLead(value: unknown, index: number): ClubLead | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Partial<ClubLead>;
  const name = normalizeText(record.name, 120);
  const whatsapp = normalizeWhatsapp(record.whatsapp);
  const source = normalizeText(record.source, 60);

  if (!name || !whatsapp) {
    return null;
  }

  return {
    id: normalizeSlug(record.id, `lead-${index + 1}`),
    name,
    whatsapp,
    source: source || "site",
    createdAt: normalizeDate(record.createdAt),
  };
}

export function sanitizeAds(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as Ad[];
  }

  return value.map((item, index) => sanitizeAd(item, index)).filter((item): item is Ad => item !== null).slice(0, MAX_ADS);
}

export function sanitizeClubLeads(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as ClubLead[];
  }

  return value.map((item, index) => sanitizeLead(item, index)).filter((item): item is ClubLead => item !== null).slice(0, MAX_LEADS);
}
