import { mockAds } from "../data/mockAds";
import type { Ad, ClubLead } from "../types";
import { sanitizeAds, sanitizeClubLeads } from "./sanitize";

const ADS_KEY = "feira_ads";
const LEADS_KEY = "feira_club_leads";

function readStoredValue<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeStoredValue(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getAds(): Ad[] {
  const storedAds = readStoredValue<unknown>(ADS_KEY);
  if (!storedAds) {
    writeStoredValue(ADS_KEY, mockAds);
    return mockAds;
  }

  const safeAds = sanitizeAds(storedAds);
  if (safeAds.length === 0) {
    writeStoredValue(ADS_KEY, mockAds);
    return mockAds;
  }

  writeStoredValue(ADS_KEY, safeAds);
  return safeAds;
}

export function saveAds(ads: Ad[]) {
  writeStoredValue(ADS_KEY, sanitizeAds(ads));
  window.dispatchEvent(new Event("ads-updated"));
}

export function addAd(ad: Ad) {
  saveAds([ad, ...getAds()]);
}

export function getClubLeads(): ClubLead[] {
  const safeLeads = sanitizeClubLeads(readStoredValue<unknown>(LEADS_KEY));
  writeStoredValue(LEADS_KEY, safeLeads);
  return safeLeads;
}

export function addClubLead(lead: ClubLead) {
  writeStoredValue(LEADS_KEY, sanitizeClubLeads([lead, ...getClubLeads()]));
}
