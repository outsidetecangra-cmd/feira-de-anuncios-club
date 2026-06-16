import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Admin } from "./pages/Admin";
import { AdDetails } from "./pages/AdDetails";
import { Ads } from "./pages/Ads";
import { Club } from "./pages/Club";
import { CreateAd } from "./pages/CreateAd";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Stores } from "./pages/Stores";
import type { Ad, ClubLead } from "./types";
import { addAd, addClubLead, getAds, getClubLeads, saveAds } from "./utils/storage";

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");

  useEffect(() => {
    const onChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return hash.replace(/^#/, "") || "/";
}

export default function App() {
  const route = useHashRoute();
  const [ads, setAds] = useState<Ad[]>(() => getAds());
  const [leads, setLeads] = useState<ClubLead[]>(() => getClubLeads());
  const [isLogged, setIsLogged] = useState(localStorage.getItem("feira_admin") === "true");

  function updateAds(nextAds: Ad[]) {
    setAds(nextAds);
    saveAds(nextAds);
  }

  function createAd(ad: Ad, clubLead?: { name: string; whatsapp: string }) {
    addAd(ad);
    setAds(getAds());
    if (clubLead) {
      addClubLead({ id: crypto.randomUUID(), ...clubLead, source: "Cadastro de anúncio", createdAt: new Date().toISOString() });
      setLeads(getClubLeads());
    }
  }

  function logout() {
    localStorage.removeItem("feira_admin");
    setIsLogged(false);
    window.location.hash = "#/";
  }

  const path = route.split("?")[0];
  const adMatch = path.match(/^\/ads\/(.+)$/);

  let page = <Home ads={ads} />;
  if (path === "/ads") page = <Ads ads={ads} />;
  if (adMatch) page = <AdDetails ads={ads} id={decodeURIComponent(adMatch[1])} />;
  if (path === "/stores") page = <Stores ads={ads} />;
  if (path === "/club") page = <Club />;
  if (path === "/create") page = <CreateAd onCreate={createAd} />;
  if (path === "/login") page = <Login onLogin={() => setIsLogged(true)} />;
  if (path === "/admin") page = <Admin ads={ads} leads={leads} isLogged={isLogged} onUpdate={updateAds} onLogout={logout} />;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {page}
      <Footer />
    </div>
  );
}
