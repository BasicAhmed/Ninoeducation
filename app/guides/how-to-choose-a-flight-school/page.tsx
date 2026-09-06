import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "كيف تختار أفضل مدرسة طيران في جنوب أفريقيا؟ | نينو إديوكيشن",
  description:
    "معايير عملية لاختيار مدرسة الطيران المناسبة: الاعتماد، الأسطول، الموقع، السعر، ونسبة نجاح الخريجين — وليس فقط الاسم الأشهر.",
  alternates: { canonical: `${SITE_URL}/guides/how-to-choose-a-flight-school` },
};

const FAQ_ITEMS = [
  {
    q: "هل المدرسة الأشهر هي الأفضل دائمًا؟",
    a: "ليس بالضرورة. الشهرة قد تعني ازدحامًا أكبر (وبالتالي انتظارًا أطول للطائرات والمدربين)، بينما مدرسة أصغر وأقل شهرة قد تقدم اهتمامًا فرديًا أكبر وجدولة أسرع. المعايير العملية أهم من الاسم وحده.",
  },
  {
    q: "كيف أتأكد أن المدرسة معتمدة فعليًا؟",
    a: "اطلب رقم اعتماد SACAA الرسمي للمدرسة وتحقق منه مباشرة، أو استخدم مدارس تم التحقق منها مسبقًا مثل المدارس المدرجة على منصتنا، حيث نراجع كل مدرسة يدويًا قبل نشرها.",
  },
  {
    q: "هل يجب أن أزور المدرسة قبل التسجيل؟",
    a: "الزيارة الشخصية مثالية لكنها غير ممكنة لمعظم الطلاب الدوليين. البديل العملي: اطلب مكالمة فيديو، اسأل عن التواصل مع طلاب حاليين أو خريجين، وراجع الأسطول والمرافق عبر الصور والفيديوهات الحديثة.",
  },
  {
    q: "هل السعر الأرخص يعني جودة أقل؟",
    a: "ليس بالضرورة، لكن سعرًا أقل بشكل ملحوظ عن متوسط السوق يستحق سؤالًا مباشرًا: هل السعر شامل كل شيء؟ أحيانًا يكون الفرق في استبعاد بنود ستدفعها لاحقًا بشكل منفصل.",
  },
  {
    q: "ماذا لو غيّرت رأيي بعد التسجيل في مدرسة؟",
    a: "هذا مكلف وصعب لوجستيًا (تأشيرة، سكن، دفعات مسبقة)، لذا الهدف من هذا الدليل هو مساعدتك على اتخاذ قرار صحيح من المرة الأولى بدلًا من التصحيح لاحقًا.",
  },
];

export default function ChooseSchoolGuidePage() {
  return (
    <GuideArticle
      path="/guides/how-to-choose-a-flight-school"
      kicker="اختيار المدرسة الصحيحة"
      title="كيف تختار أفضل مدرسة طيران في جنوب أفريقيا؟"
      intro="أكثر من 30 مدرسة معتمدة تعمل في جنوب أفريقيا. إليك المعايير العملية التي تفرّق فعليًا بين خيار جيد وخيار قد تندم عليه."
      faqItems={FAQ_ITEMS}
      related={[
        { title: "الفرق بين PPL و CPL", href: "/guides/ppl-vs-cpl" },
        { title: "كم تكلفة تعلم الطيران في جنوب أفريقيا؟", href: "/guides/flight-training-cost-south-africa" },
        { title: "مشاكل قد تواجهك أثناء البرنامج", href: "/guides/common-challenges-flight-training" },
      ]}
    >
      <section id="accreditation">
        <h2 className="font-display text-2xl text-nino-ink">الاعتماد الرسمي أولًا، بلا استثناء</h2>
        <p className="mt-3">
          قبل أي معيار آخر، تأكد أن المدرسة معتمدة رسميًا من SACAA. هذا ليس
          تفصيلًا شكليًا — بدونه، رخصتك النهائية قد لا تكون معترفًا بها دوليًا
          على الإطلاق. راجع{" "}
          <Link href="/guides/sacaa-medical-requirements" className="text-nino-orange hover:underline">
            دليل متطلبات SACAA
          </Link>{" "}
          لفهم دور هذه الهيئة بالتفصيل.
        </p>
      </section>

      <section id="criteria">
        <h2 className="font-display text-2xl text-nino-ink">المعايير العملية للمقارنة</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>الأسطول:</strong> عدد الطائرات مقابل عدد الطلاب — أسطول صغير مع طلاب كثر يعني انتظارًا أطول.</li>
          <li><strong>الموقع والطقس:</strong> بعض المناطق تتيح أيام طيران أكثر سنويًا من غيرها.</li>
          <li><strong>هيكل السعر:</strong> هل هو شامل أم يحتوي رسومًا منفصلة على الفحوصات والمعدات؟</li>
          <li><strong>دعم الطلاب الدوليين:</strong> هل لديهم خبرة فعلية مع طلاب عرب أو دوليين من قبل؟</li>
          <li><strong>توفر السكن القريب:</strong> يوفر عليك وقتًا وتنسيقًا إضافيًا.</li>
          <li><strong>سرعة التواصل:</strong> كيف تستجيب المدرسة لأسئلتك الآن؟ هذا مؤشر جيد لما بعد التسجيل.</li>
        </ul>
      </section>

      <section id="compare">
        <h2 className="font-display text-2xl text-nino-ink">قارن أكثر من مدرسة قبل القرار</h2>
        <p className="mt-3">
          لا تكتفِ بمدرسة واحدة. استخدم{" "}
          <Link href="/schools" className="text-nino-orange hover:underline">
            صفحة المدارس
          </Link>{" "}
          لفلترة الخيارات حسب ميزانيتك ورخصتك المستهدفة، ثم استخدم أداة{" "}
          <Link href="/schools/compare" className="text-nino-orange hover:underline">
            المقارنة المباشرة
          </Link>{" "}
          لوضع مدرستين أو أكثر جنبًا إلى جنب بالأرقام الفعلية.
        </p>
      </section>

      <section id="not-sure">
        <h2 className="font-display text-2xl text-nino-ink">لست متأكدًا من أين تبدأ؟</h2>
        <p className="mt-3">
          جرّب{" "}
          <Link href="/quiz" className="text-nino-orange hover:underline">
            أداة البحث عن مدرستك المناسبة
          </Link>{" "}
          — ثلاثة أسئلة سريعة عن هدفك وميزانيتك، وتحصل على ترشيحات مباشرة
          بدلًا من مراجعة عشرات المدارس يدويًا.
        </p>
      </section>
    </GuideArticle>
  );
}
