import Link from "next/link";
import { db } from "@/db/client";
import { flightSchools } from "@/db/schema";
import { deleteSchool } from "@/lib/admin-actions";

export default async function AdminSchoolsPage() {
  const schools = await db.select().from(flightSchools).orderBy(flightSchools.ninoRanking);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">مدارس الطيران</h1>
        <Link
          href="/admin/schools/new"
          className="rounded-full bg-nino-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-nino-orange"
        >
          + إضافة مدرسة
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-nino-line bg-nino-white">
        <table className="w-full text-sm">
          <thead className="bg-nino-cream text-start">
            <tr>
              <th className="p-4 text-start">الاسم</th>
              <th className="p-4 text-start">المدينة</th>
              <th className="p-4 text-start">الحالة</th>
              <th className="p-4 text-start">السعر</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-t [&>tr]:border-nino-line">
            {schools.map((s) => (
              <tr key={s.id}>
                <td className="p-4">{s.nameAr}</td>
                <td className="p-4">{s.city}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      s.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {s.status === "published" ? "منشور" : "مسودة"}
                  </span>
                </td>
                <td dir="ltr" className="p-4 text-start">
                  R{s.priceMinZar.toLocaleString()}–{s.priceMaxZar.toLocaleString()}
                </td>
                <td className="p-4 text-end">
                  <Link
                    href={`/admin/schools/${s.id}/edit`}
                    className="text-nino-orange hover:underline"
                  >
                    تعديل
                  </Link>
                  <form action={deleteSchool} className="mt-1 inline-block ms-3">
                    <input type="hidden" name="id" value={s.id} />
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
