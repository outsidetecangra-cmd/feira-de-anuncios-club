import { useEffect, useState } from "react";
import { cacheVisits, countVisitIfNeeded, loadVisits, readCachedVisits } from "../utils/visits";

const NUMBER_FORMATTER = new Intl.NumberFormat("pt-BR");

export function VisitorCounter() {
  const [visits, setVisits] = useState<number | null>(readCachedVisits());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const syncVisits = async () => {
      try {
        const nextVisits = await countVisitIfNeeded();

        if (!isActive) {
          return;
        }

        cacheVisits(nextVisits);
        setVisits(nextVisits);
        return;
      } catch {
        try {
          const currentVisits = await loadVisits();

          if (!isActive) {
            return;
          }

          cacheVisits(currentVisits);
          setVisits(currentVisits);
        } catch {
          if (isActive) {
            setVisits(null);
          }
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void syncVisits();

    return () => {
      isActive = false;
    };
  }, []);

  const title = visits === null ? "Contador indisponível" : `Total de visitas: ${NUMBER_FORMATTER.format(visits)}`;

  return (
    <p className="text-xs font-medium tracking-wide text-slate-300" title={title}>
      Visitas ao site:{" "}
      <span className="font-bold tabular-nums text-sale">
        {loading && visits === null ? "..." : visits === null ? "indisponível" : NUMBER_FORMATTER.format(visits)}
      </span>
    </p>
  );
}
