"use client";

import { Search } from "lucide-react";

export function AdminSearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search size={16} className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-nino-ink/40" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-nino-line bg-nino-white py-2.5 ps-10 pe-4 text-sm outline-none focus:border-nino-orange md:w-72"
      />
    </div>
  );
}
