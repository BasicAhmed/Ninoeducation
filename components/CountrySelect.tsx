"use client";

import { COUNTRIES } from "@/lib/countries";
import { inputClass } from "@/lib/form-styles";
import { dictionaries, type Lang } from "@/lib/i18n/dictionaries";

export function CountrySelect({
  id,
  label,
  value,
  onChange,
  error,
  lang = "ar",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  lang?: Lang;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 w-full ${inputClass(!!error)}`}
      >
        <option value="">{dictionaries[lang].apply.chooseCountry}</option>
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {lang === "ar" ? c.name : c.nameEn}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
