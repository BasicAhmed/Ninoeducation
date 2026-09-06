import Link from "next/link";
import { CheckCircle2, PlaneTakeoff, MessageCircle, ListChecks, Home, Send } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export const metadata = { title: "تم استلام طلبك | نينو إديوكيشن" };

const NEXT_STEPS = [
  {
    icon: MessageCircle,
    title: "خلال 24–48 ساعة",
    text: "بيتصل فيك أحد مستشارينا يتعرف على وضعك أكثر — لا فورمات ولا تعقيد.",
  },
  {
    icon: ListChecks,
    title: "نرشح لك",
    text: "نجهز لك أفضل المدارس المناسبة، مع خطاب قبول أولي من المدرسة المختارة.",
  },
  {
    icon: Home,
    title: "نمشي معك خطوة بخطوة",
    text: "من الفيزا للسكن للسفر — ما راح تحتاج تسوي شي لحالك.",
  },
];

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; name?: string }>;
}) {
  const { ref, name } = await searchParams;

  const whatsappText = ref
    ? `مرحبًا، رقم رحلتي هو ${ref} — أريد تأكيد استلام طلبي.`
    : "مرحبًا، قدّمت طلبًا للتو وأريد التأكيد.";

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-nino-cream px-6 py-20">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-nino-orange text-white shadow-lg shadow-nino-orange/30">
            <CheckCircle2 size={28} />
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-nino-orange">
            وصلنا طلبك
          </p>
          <h1 className="mt-2 font-display text-4xl">
            {name ? `يلا يا ${name}، بدأنا! 🎉` : "يلا، بدأنا! 🎉"}
          </h1>
          <p className="mt-3 text-nino-ink/70">
            من هنا وطالع، الباقي علينا.
          </p>
        </div>

        {ref && (
          <div className="mx-auto mt-10 max-w-lg overflow-hidden rounded-2xl border border-nino-ink bg-nino-ink text-white">
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-display text-sm">رقم رحلتك</span>
              <PlaneTakeoff size={16} className="text-nino-orange" />
            </div>
            <div className="border-t border-dashed border-white/20 px-6 py-6 text-center">
              <div dir="ltr" className="font-display text-3xl tracking-widest text-nino-orange">
                {ref}
              </div>
              <p className="mt-2 text-xs text-white/50">
                خلّه عندك — فيك تتابع طلبك به في أي وقت
              </p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-x-reverse divide-dashed divide-white/20 border-t border-dashed border-white/20">
              <Link
                href={`/track?ref=${ref}`}
                className="px-4 py-3.5 text-center text-sm font-medium hover:bg-white/5"
              >
                تابع طلبي
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-3.5 text-center text-sm font-medium hover:bg-white/5"
              >
                <Send size={13} />
                أرسله على واتساب
              </a>
            </div>
          </div>
        )}

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
            وانت تنتظر، شوف المدارس
          </Link>
          <Link href="/" className="text-sm text-nino-ink/60 hover:text-nino-orange">
            رجوع للصفحة الرئيسية
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
