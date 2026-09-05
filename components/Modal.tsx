"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10">
      <div
        aria-hidden
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl rounded-2xl bg-nino-white p-6 shadow-2xl md:p-8">
        <div className="flex items-center justify-between border-b border-nino-line pb-4">
          <h2 className="font-display text-xl">{title}</h2>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="flex h-8 w-8 items-center justify-center rounded-full text-nino-ink/50 hover:bg-nino-cream hover:text-nino-ink"
          >
            <X size={18} />
          </button>
        </div>
        <div className="pt-6">{children}</div>
      </div>
    </div>
  );
}
