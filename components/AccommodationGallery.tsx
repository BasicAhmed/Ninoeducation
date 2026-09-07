"use client";

import { useState } from "react";
import Image from "next/image";

export function AccommodationGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-nino-cream">
        <Image
          src={images[active]}
          alt={alt}
          fill
          unoptimized
          priority
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {images.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${alt} ${i + 1}`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === active ? "border-nino-orange" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={url} alt="" fill unoptimized className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
