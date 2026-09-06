"use client";

import { COUNTRIES } from "@/lib/countries";
import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js/min";
import { inputClass } from "@/lib/form-styles";

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
}: {
  label: string;
  countryCode: string;
  onCountryChange: (v: string) => void;
  national: string;
  onNationalChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  const dial = COUNTRIES.find((c) => c.code === countryCode)?.dialCode;

  return (
    <div>
      <label className="block text-sm font-medium">
        {label}
        {!required && <span className="text-nino-ink/40"> (اختياري)</span>}
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
          placeholder={dial ? "5xxxxxxxx" : "اختر الدولة أولًا"}
          className={`min-w-0 flex-1 ${inputClass(!!error)}`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
