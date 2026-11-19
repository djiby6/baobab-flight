"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { FALLBACK_COUNTRY_IMAGE } from "@/lib/image-fallback";

type SafeImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  fallbackSrc?: string;
};

export function SafeImage({
  src,
  fallbackSrc,
  alt,
  unoptimized = true,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      unoptimized={unoptimized}
      onError={() => {
        setCurrentSrc((current) => {
          if (fallbackSrc && current !== fallbackSrc) {
            return fallbackSrc;
          }

          if (current !== FALLBACK_COUNTRY_IMAGE) {
            return FALLBACK_COUNTRY_IMAGE;
          }

          return current;
        });
      }}
    />
  );
}
