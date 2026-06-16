import { mockAds } from "../data/mockAds";
import type { Ad, ClubLead } from "../types";

const ADS_KEY = "feira_ads";
const LEADS_KEY = "feira_club_leads";

export function getAds(): Ad[] {
  const raw = localStorage.getItem(ADS_KEY);
  if (!raw) {
    localStorage.setItem(ADS_KEY, JSON.stringify(mockAds));
    return mockAds;
  }

  try {
    return JSON.parse(raw) as Ad[];
  } catch {
    localStorage.setItem(ADS_KEY, JSON.stringify(mockAds));
    return mockAds;
  }
}

export function saveAds(ads: Ad[]) {
  localStorage.setItem(ADS_KEY, JSON.stringify(ads));
  window.dispatchEvent(new Event("ads-updated"));
}

export function addAd(ad: Ad) {
  saveAds([ad, ...getAds()]);
}

export function getClubLeads(): ClubLead[] {
  const raw = localStorage.getItem(LEADS_KEY);
  return raw ? (JSON.parse(raw) as ClubLead[]) : [];
}

export function addClubLead(lead: ClubLead) {
  localStorage.setItem(LEADS_KEY, JSON.stringify([lead, ...getClubLeads()]));
}
