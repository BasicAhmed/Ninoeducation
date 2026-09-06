import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "نصائح عملية للنجاح في دراسة الطيران بجنوب أفريقيا | نينو إديوكيشن",
  description:
    "نصائح واقعية من تجارب طلاب سابقين: كيف تتأقلم بسرعة، تدير ميزانيتك، وتحافظ على تقدمك في التدريب دون تعثر.",
  alternates: { canonical: `${SITE_URL}/guides/tips-to-succeed-in-south-africa` },
};

const FAQ_ITEMS = [
  {
    q: "هل أحتاج سيارة في جنوب أفريقيا؟",
    a: "ليس بالضرورة إذا كان سكنك قريبًا من المدرسة، لكن امتلاك وسيلة تنقل (سيارة مستعملة رخيصة أو ترتيب مشترك مع زملاء) يسهل حياتك كثيرًا للتسوق والمشاوير خارج الروتين اليومي.",
  },
  {
    q: "كيف أدير أموالي بذكاء أثناء البرنامج؟",
    a: "افتح حسابًا بنكيًا محليًا فور وصولك لتفادي رسوم التحويل المتكررة، وخصص ميزانية شهرية واضحة للمعيشة منفصلة عن رسوم التدريب، مع هامش احتياطي للطوارئ.",
  },
  {
    q: "هل أحتاج شريحة اتصال محلية؟",
    a: "نعم، فور وصولك تقريبًا. تسهّل التواصل اليومي مع المدرسة والسكن، وأرخص بكثير من التجوال الدولي على شريحتك الأصلية.",
  },
  {
    q: "كيف أحافظ على تقدمي في التدريب دون تعثر؟",
    a: "راجع موادك النظرية بانتظام بدل التكديس قبل الاختبارات، واسأل مدربك عن أي نقطة غير واضحة فورًا بدل تأجيلها. التقدم المنتظم البطيء أفضل من محاولة التسريع المفاجئ.",
  },
  {
    q: "هل يستحق الأمر التواصل مع خريجين سابقين؟",
    a: "بالتأكيد. خريجو المدرسة أو طلاب في مراحل متقدمة يعطونك صورة واقعية لا تجدها في أي إعلان تسويقي — عن الجدولة الفعلية، المدربين، وحتى أفضل أماكن السكن والطعام القريبة.",
  },
];

export default function TipsGuidePage() {
  return (
    <GuideArticle
      path="/guides/tips-to-succeed-in-south-africa"
      kicker="نصائح عملية"
      title="كيف تنجح في دراسة الطيران بجنوب أفريقيا؟"
      intro="نصائح واقعية مبنية على تجارب طلاب سبقوك — ليست نظرية، بل أشياء عملية تفرق فعليًا بين رحلة سلسة وأخرى مليئة بالعثرات."
      faqItems={FAQ_ITEMS}
      related={[
        { title: "مشاكل قد تواجهك أثناء البرنامج", href: "/guides/common-challenges-flight-training" },
        { title: "السكن الطلابي في جنوب أفريقيا", href: "/guides/student-accommodation-south-africa" },
        { title: "دراسة الطيران في جنوب أفريقيا: الدليل الشامل", href: "/guides/study-aviation-in-south-africa" },
      ]}
    >
      <section id="before-arrival">
        <h2 className="font-display text-2xl text-nino-ink">قبل الوصول</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>أكمل إجراءات التأشيرة مبكرًا — راجع{" "}
            <Link href="/guides/south-africa-study-visa" className="text-nino-orange hover:underline">دليل التأشيرة</Link>.
          </li>
          <li>أكد حجز سكنك قبل السفر بوقت كافٍ، وليس بعد الوصول.</li>
          <li>احضر نسخًا رقمية وورقية من كل مستنداتك الرسمية (جواز، خطاب قبول، شهادات طبية).</li>
          <li>تواصل مع طلاب حاليين في نفس المدرسة إن أمكن — حتى مجموعة واتساب واحدة تفرق كثيرًا.</li>
        </ul>
      </section>

      <section id="first-weeks">
        <h2 className="font-display text-2xl text-nino-ink">أول أسابيعك</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>افتح حسابًا بنكيًا محليًا واحصل على شريحة اتصال فور وصولك.</li>
          <li>تعرّف على محيط سكنك: أقرب سوبرماركت، صيدلية، ومحطة مواصلات.</li>
          <li>لا تعزل نفسك — انضم لأي مجتمع طلابي محلي، عربي أو دولي.</li>
        </ul>
      </section>

      <section id="during-training">
        <h2 className="font-display text-2xl text-nino-ink">أثناء التدريب</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>راجع المواد النظرية بانتظام، لا تؤجلها لآخر لحظة قبل الاختبار.</li>
          <li>اسأل مدربك فور ظهور أي التباس، بدل تكديس الأسئلة.</li>
          <li>خصص ميزانية شهرية واضحة، وتابعها — راجع{" "}
            <Link href="/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">دليل التكلفة</Link>{" "}
            لتخطيط أدق.
          </li>
          <li>توقع تأخيرًا طبيعيًا في الجدول الزمني، ولا تعتبره فشلاً شخصيًا.</li>
        </ul>
      </section>

      <section id="mindset">
        <h2 className="font-display text-2xl text-nino-ink">العقلية الصحيحة</h2>
        <p className="mt-3">
          التدريب على الطيران رحلة طويلة نسبيًا، لا حدث واحدًا. الطلاب الذين
          ينجحون هم غالبًا من يتعاملون معه كعملية يومية تراكمية، ويطلبون
          الدعم عند الحاجة بدل مواجهة كل تحدٍ بمفردهم.{" "}
          <Link href="/apply" className="text-nino-orange hover:underline">
            ابدأ رحلتك اليوم
          </Link>{" "}
          ونحن معك في كل خطوة.
        </p>
      </section>
    </GuideArticle>
  );
}
