import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SafeImage } from "../components/SafeImage";
import type { Ad } from "../types";

const carouselImages = [
  "/anuncios/escola/instituto-educacional-recriar.png",
  "/carrossel/1.png",
  "/carrossel/2.png",
  "/carrossel/3.png",
];

export function Home({ ads }: { ads: Ad[] }) {
  void ads;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((index) => (index + 1) % carouselImages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  function goToSlide(index: number) {
    setCurrentSlide(index);
  }

  function goToPrevious() {
    setCurrentSlide((index) => (index - 1 + carouselImages.length) % carouselImages.length);
  }

  function goToNext() {
    setCurrentSlide((index) => (index + 1) % carouselImages.length);
  }

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-100">
        <div className="container-page pb-4 pt-1 sm:pb-6 sm:pt-2">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-soft">
            <div className="relative aspect-[16/9] min-h-[220px] bg-slate-100 sm:min-h-[320px] lg:min-h-[420px]">
              {carouselImages.map((image, index) => (
                <SafeImage
                  key={image}
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                  src={image}
                  alt={`Destaque ${index + 1} da Feira de Anúncios`}
                />
              ))}
            </div>

            <button
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-white"
              type="button"
              aria-label="Imagem anterior"
              onClick={goToPrevious}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-white"
              type="button"
              aria-label="Próxima imagem"
              onClick={goToNext}
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/20 px-3 py-2 backdrop-blur-sm">
              {carouselImages.map((image, index) => (
                <button
                  key={image}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                  type="button"
                  aria-label={`Ir para imagem ${index + 1}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
