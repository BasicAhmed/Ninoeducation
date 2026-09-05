import Link from "next/link";
import { db } from "@/db/client";
import { accommodations } from "@/db/schema";
import { deleteAccommodation } from "@/lib/admin-actions";

export default async function AdminAccommodationPage() {
  const listings = await db.select().from(accommodations);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">السكن الطلابي</h1>
        <Link
          href="/admin/accommodation/new"
          className="rounded-full bg-nino-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-nino-orange"
        >
          + إضافة سكن
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-nino-line bg-nino-white">
        <table className="w-full text-sm">
          <thead className="bg-nino-cream">
            <tr>
              <th className="p-4 text-start">الاسم</th>
              <th className="p-4 text-start">المدينة</th>
              <th className="p-4 text-start">السعر الشهري</th>
              <th className="p-4 text-start">الحالة</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-t [&>tr]:border-nino-line">
            {listings.map((a) => (
              <tr key={a.id}>
                <td className="p-4">{a.nameAr}</td>
                <td className="p-4">{a.city}</td>
                <td dir="ltr" className="p-4 text-start">
                  R{a.monthlyPriceZar.toLocaleString()}
                </td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      a.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {a.status === "published" ? "منشور" : "مسودة"}
                  </span>
                </td>
                <td className="p-4 text-end">
                  <Link href={`/admin/accommodation/${a.id}/edit`} className="text-nino-orange hover:underline">
                    تعديل
                  </Link>
                  <form action={deleteAccommodation} className="mt-1 inline-block ms-3">
                    <input type="hidden" name="id" value={a.id} />
                    <button className="text-red-500 hover:underline">حذف</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
