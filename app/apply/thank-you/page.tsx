import Link from "next/link";
import { PlaneTakeoff, MessageCircle, ListChecks, Home } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = { title: "تم استلام طلبك | نينو إديوكيشن" };

const NEXT_STEPS = [
  {
    icon: MessageCircle,
    title: "خلال 24–48 ساعة",
    text: "يتواصل معك أحد مستشارينا لفهم أهدافك وميزانيتك بدقة أكبر.",
  },
  {
    icon: ListChecks,
    title: "المطابقة",
    text: "نرشح لك المدارس الأنسب ونرسل خطاب قبول أولي من المدرسة المختارة.",
  },
  {
    icon: Home,
    title: "التنسيق",
    text: "نبدأ معك بترتيب الفيزا والسكن والسفر خطوة بخطوة.",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream px-6 py-20">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-nino-orange text-white shadow-lg shadow-nino-orange/30">
            <PlaneTakeoff size={26} />
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-nino-orange">
            تم الإقلاع
          </p>
          <h1 className="mt-2 font-display text-4xl">طلبك في الجو الآن.</h1>
          <p className="mt-3 text-nino-ink/70">
            استلمنا طلبك بنجاح. من هنا، نتولى نحن التفاصيل.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-lg space-y-5">
          {NEXT_STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="flex gap-4 rounded-2xl border border-nino-line bg-nino-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nino-orange/10 text-nino-orange">
                  <Icon size={17} />
                </div>
                <div>
                  <div className="text-xs text-nino-ink/40">{i + 1}</div>
                  <div className="font-display text-base">{s.title}</div>
                  <p className="mt-0.5 text-sm text-nino-ink/60">{s.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-3">
          <Link
            href="/schools"
            className="w-full rounded-full bg-nino-ink py-3.5 text-center text-sm font-medium text-white hover:bg-nino-orange sm:w-auto sm:px-8"
          >
            بينما تنتظر، تصفح المدارس
          </Link>
          <Link href="/" className="text-sm text-nino-ink/60 hover:text-nino-orange">
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
