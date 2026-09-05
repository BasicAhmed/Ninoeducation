import Image from "next/image";
import { Heart, AtSign } from "lucide-react";
import { getPublishedSocialPosts } from "@/lib/social";

const ROTATIONS = [-4, 3, -2, 4, -3, 2];

export async function InstagramGallery() {
  const posts = await getPublishedSocialPosts(6);
  if (posts.length === 0) return null;

  return (
    <section className="border-b border-nino-line bg-nino-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
              خلف الكواليس
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              تابعنا على إنستقرام
            </h2>
          </div>
          <a
            href="https://www.instagram.com/nino.education"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-nino-ink/20 px-5 py-2.5 text-sm font-medium text-nino-ink hover:border-nino-ink"
          >
            <AtSign size={16} />
            nino.education
          </a>
        </div>

        <div className="mt-14 flex gap-6 overflow-x-auto px-2 pb-6 [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:px-0 lg:grid-cols-6">
          {posts.map((p, i) => (
            <a
              key={p.id}
              href={p.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square w-48 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-nino-cream shadow-lg transition-all duration-300 hover:z-10 hover:rotate-0 hover:scale-110 hover:shadow-2xl sm:w-full"
              style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)` }}
            >
              <Image
                src={p.imageUrl}
                alt={p.caption}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/0 to-black/0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="line-clamp-2 text-xs text-white">{p.caption}</p>
                {p.likes != null && (
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-white/80">
                    <Heart size={12} className="fill-white" />
                    {p.likes.toLocaleString("en-US")}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
