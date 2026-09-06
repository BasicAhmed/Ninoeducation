import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="breadcrumb" className="text-xs text-nino-ink/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="hover:text-nino-orange">
                {item.label}
              </Link>
            ) : (
              <span className={i === items.length - 1 ? "text-nino-ink/70" : ""}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
