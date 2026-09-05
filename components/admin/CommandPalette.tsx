"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Building2, Home, ClipboardList } from "lucide-react";

type Result = { id: string; label: string; sublabel: string; href: string };
type Results = { schools: Result[]; accommodation: Result[]; applications: Result[] };

const EMPTY: Results = { schools: [], accommodation: [], applications: [] };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Results>(EMPTY);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function openPalette() {
    setOpen(true);
  }

  function closePalette() {
    setOpen(false);
    setQuery("");
    setResults(EMPTY);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (o) {
            setQuery("");
            setResults(EMPTY);
            return false;
          }
          return true;
        });
      }
      if (e.key === "Escape") closePalette();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  function handleQueryChange(value: string) {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults(EMPTY);
    }
  }

  useEffect(() => {
    if (query.trim().length < 2) return;
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`);
        const json = await res.json();
        setResults(json);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  const totalResults = results.schools.length + results.accommodation.length + results.applications.length;

  function go(href: string) {
    closePalette();
    router.push(href);
  }

  return (
    <>
      <button
        onClick={openPalette}
        className="flex w-full max-w-xs items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/60 hover:border-white/25 hover:text-white/80"
      >
        <Search size={15} />
        <span className="flex-1 text-start">ابحث في كل شيء...</span>
        <kbd className="hidden rounded border border-white/20 px-1.5 py-0.5 text-[10px] md:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/50 p-4 pt-[10vh]">
          <div className="absolute inset-0" onClick={closePalette} />
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-nino-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-nino-line px-4 py-3">
              <Search size={18} className="text-nino-ink/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="ابحث عن مدرسة، سكن، أو طالب..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-nino-ink/40"
              />
              {loading && <span className="text-xs text-nino-ink/40">...</span>}
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {query.trim().length >= 2 && totalResults === 0 && !loading && (
                <p className="p-4 text-center text-sm text-nino-ink/50">لا توجد نتائج</p>
              )}

              <ResultGroup title="مدارس الطيران" icon={Building2} items={results.schools} onSelect={go} />
              <ResultGroup title="السكن" icon={Home} items={results.accommodation} onSelect={go} />
              <ResultGroup title="الطلبات" icon={ClipboardList} items={results.applications} onSelect={go} />

              {query.trim().length < 2 && (
                <p className="p-4 text-center text-sm text-nino-ink/40">اكتب حرفين على الأقل للبحث</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ResultGroup({
  title,
  icon: Icon,
  items,
  onSelect,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  items: Result[];
  onSelect: (href: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-1">
      <p className="px-3 py-1.5 text-xs font-medium text-nino-ink/40">{title}</p>
      {items.map((r) => (
        <button
          key={r.id}
          onClick={() => onSelect(r.href)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start text-sm hover:bg-nino-cream"
        >
          <Icon size={16} className="shrink-0 text-nino-orange" />
          <span className="flex-1 truncate">{r.label}</span>
          <span className="shrink-0 truncate text-xs text-nino-ink/40">{r.sublabel}</span>
        </button>
      ))}
    </div>
  );
}
