"use client";

import { dismissApplicationDraft } from "@/lib/admin-actions";

export function DismissDraftButton({ id }: { id: string }) {
  return (
    <form
      action={dismissApplicationDraft}
      onSubmit={(e) => {
        if (!confirm("تجاهل هذا الطلب المتروك؟")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="text-xs text-red-500 hover:underline">تجاهل</button>
    </form>
  );
}
