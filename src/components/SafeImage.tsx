import { useEffect, useState } from "react";
import type { ImgHTMLAttributes, SyntheticEvent } from "react";
import { sanitizeImageUrl } from "../utils/sanitize";

const FALLBACK_IMAGE = "/assets/logo-vert.png?v=3";

type SafeImageProps = ImgHTMLAttributes<HTMLImageElement>;

export function SafeImage({ alt, loading = "lazy", onError, src, ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(() => sanitizeImageUrl(src));

  useEffect(() => {
    setCurrentSrc(sanitizeImageUrl(src));
  }, [src]);

  function handleError(event: SyntheticEvent<HTMLImageElement, Event>) {
    if (currentSrc !== FALLBACK_IMAGE) {
      setCurrentSrc(FALLBACK_IMAGE);
    }

    onError?.(event);
  }

  return (
    <img
      {...props}
      alt={alt}
      decoding="async"
      loading={loading}
      referrerPolicy="no-referrer"
      src={currentSrc}
      onError={handleError}
    />
  );
}
