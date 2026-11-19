"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/safe-image";

type ExperienceMediaProps = {
  image: string;
  imageAlt: string;
  videoUrl?: string;
  poster?: string;
  fallbackImage: string;
};

export function ExperienceMedia({
  image,
  imageAlt,
  videoUrl,
  poster,
  fallbackImage,
}: ExperienceMediaProps) {
  const [videoFailed, setVideoFailed] = useState(false);

  if (!videoUrl || videoFailed) {
    return (
      <SafeImage
        src={image}
        fallbackSrc={fallbackImage}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
    );
  }

  return (
    <video
      className="h-full w-full object-cover"
      controls
      playsInline
      preload="metadata"
      poster={poster ?? image}
      aria-label={imageAlt}
      onError={() => setVideoFailed(true)}
    >
      <source
        src={videoUrl}
        type="video/mp4"
        onError={() => setVideoFailed(true)}
      />
    </video>
  );
}
