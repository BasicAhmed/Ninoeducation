"use client";

import { COUNTRIES } from "@/lib/countries";
import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js/min";
import { inputClass } from "@/lib/form-styles";
import { dictionaries, type Lang } from "@/lib/i18n/dictionaries";

export function validatePhone(countryCode: string, national: string): boolean {
  if (!countryCode || !national.trim()) return false;
  try {
    return isValidPhoneNumber(national, countryCode as CountryCode);
  } catch {
    return false;
  }
}

export function PhoneField({
  label,
  countryCode,
  onCountryChange,
  national,
  onNationalChange,
  error,
  required,
  lang = "ar",
}: {
  label: string;
  countryCode: string;
  onCountryChange: (v: string) => void;
  national: string;
  onNationalChange: (v: string) => void;
  error?: string;
  required?: boolean;
  lang?: Lang;
}) {
  const dial = COUNTRIES.find((c) => c.code === countryCode)?.dialCode;
  const t = dictionaries[lang].apply;

  return (
    <div>
      <label className="block text-sm font-medium">
        {label}
        {!required && <span className="text-nino-ink/40"> ({t.optional})</span>}
      </label>
      <div className="mt-1.5 flex gap-2" dir="ltr">
        <select
          value={countryCode}
          onChange={(e) => onCountryChange(e.target.value)}
          className={`w-28 shrink-0 ${inputClass(!!error)}`}
        >
          <option value="">+--</option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              +{c.dialCode} {c.code}
            </option>
          ))}
        </select>
        <input
          type="tel"
          inputMode="numeric"
          value={national}
          onChange={(e) => onNationalChange(e.target.value.replace(/[^\d\s]/g, ""))}
          placeholder={dial ? "5xxxxxxxx" : t.chooseCountryFirst}
          className={`min-w-0 flex-1 ${inputClass(!!error)}`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
