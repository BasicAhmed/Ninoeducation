"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { GuideMeta } from "@/lib/guides";

export function GuidesSearch({ guides }: { guides: GuideMeta[] }) {
  const [query, setQuery] = useState("");

  const filtered = guides.filter((g) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="relative mt-8 max-w-md">
        <Search size={16} className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-4 text-nino-ink/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث في الأدلة... مثلًا: تأشيرة، تكلفة، رخصة"
          className="w-full rounded-full border border-nino-line bg-nino-white py-3 ps-11 pe-4 text-sm outline-none transition-colors focus:border-nino-orange"
        />
      </div>

      <p className="mt-3 text-xs text-nino-ink/50">
        {filtered.length} {filtered.length === 1 ? "دليل" : "أدلة"}
        {query.trim() && ` مطابق لـ "${query.trim()}"`}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-nino-line bg-nino-white p-10 text-center text-nino-ink/60">
          لا توجد أدلة مطابقة لبحثك. جرّب كلمة أخرى، أو تصفح كل الأدلة أدناه.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {filtered.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="flex flex-col rounded-2xl border border-nino-line bg-nino-white p-6 transition hover:border-nino-orange"
            >
              <h2 className="font-display text-lg">{g.title}</h2>
              <p className="mt-2 text-sm text-nino-ink/60">{g.description}</p>
              <span className="mt-4 text-sm font-medium text-nino-orange">اقرأ الدليل ←</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
