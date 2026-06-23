import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Admin } from "./pages/Admin";
import { AdDetails } from "./pages/AdDetails";
import { Categories } from "./pages/Categories";
import { Club } from "./pages/Club";
import { CreateAd } from "./pages/CreateAd";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Stores } from "./pages/Stores";
import type { Ad, ClubLead } from "./types";
import { clearMockAdminSession, readMockAdminSession } from "./utils/mockAdmin";
import { getAds, getClubLeads, saveAds } from "./utils/storage";

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
  const [leads] = useState<ClubLead[]>(() => getClubLeads());
  const [isLogged, setIsLogged] = useState(() => readMockAdminSession());

  useEffect(() => {
    setIsLogged(readMockAdminSession());
  }, [route]);

  function updateAds(nextAds: Ad[]) {
    setAds(nextAds);
    saveAds(nextAds);
  }

  function logout() {
    clearMockAdminSession();
    setIsLogged(false);
    window.location.hash = "#/";
  }

  const path = route.split("?")[0];
  const adMatch = path.match(/^\/ads\/(.+)$/);

  let page = <Home ads={ads} />;
  if (path === "/ads" || path === "/categories") page = <Categories ads={ads} />;
  if (adMatch) page = <AdDetails ads={ads} id={decodeURIComponent(adMatch[1])} />;
  if (path === "/stores") page = <Stores ads={ads} />;
  if (path === "/club") page = <Club />;
  if (path === "/create") page = <CreateAd />;
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
