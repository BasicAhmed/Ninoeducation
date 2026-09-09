import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "كم تكلفة تعلم الطيران في جنوب أفريقيا؟ (2026) | نينو إديوكيشن",
  description:
    "تفصيل كامل لتكلفة دراسة الطيران في جنوب أفريقيا: رسوم التدريب، السكن، المعيشة، التأشيرة، وكيف تخطط لميزانيتك بدون مفاجآت.",
  alternates: { canonical: `${SITE_URL}/guides/flight-training-cost-south-africa` },
};

const FAQ_ITEMS = [
  {
    q: "هل الأسعار المعلنة من المدارس تشمل كل شيء؟",
    a: "غالبًا لا. معظم المدارس تعلن سعر التدريب الأساسي فقط (ساعات الطيران والمواد النظرية)، بينما تُحسب رسوم الفحوصات، الكتب، والمعدات الشخصية بشكل منفصل أحيانًا. اسأل دائمًا 'هل هذا السعر شامل كل شيء؟' قبل الالتزام.",
  },
  {
    q: "هل يمكن أن ترتفع التكلفة أثناء التدريب؟",
    a: "نعم، وهذا شائع أكثر مما يتوقع الطلاب. إذا احتجت ساعات طيران إضافية عن الحد الأدنى (بسبب سرعة التعلم الفردية أو تأجيل الطيران لأسباب جوية)، تُحسب هذه الساعات الإضافية بشكل منفصل. من المهم تخصيص هامش احتياطي في ميزانيتك.",
  },
  {
    q: "هل توجد خيارات تمويل أو تقسيط؟",
    a: "تختلف السياسة من مدرسة لأخرى — بعضها يسمح بالدفع على دفعات مرتبطة بمراحل التدريب بدلًا من دفعة واحدة كاملة مقدمًا. اسأل عن هذا تحديدًا عند المقارنة، فهو يؤثر كثيرًا على التخطيط المالي.",
  },
  {
    q: "هل تكلفة المعيشة في جنوب أفريقيا مرتفعة؟",
    a: "لا، بشكل عام تكلفة المعيشة في جنوب أفريقيا أقل بكثير من أوروبا أو أمريكا الشمالية، وأقل من كثير من الدول العربية أيضًا. السكن، الطعام، والمواصلات المحلية معقولة نسبيًا خاصة في المدن الأصغر القريبة من مراكز التدريب.",
  },
  {
    q: "كيف أحصل على تقدير دقيق لميزانيتي؟",
    a: "استخدم حاسبة التكلفة على الموقع لإدخال أهدافك (الرخصة المستهدفة، مدة الإقامة، نمط السكن المفضل)، وستحصل على تقدير مخصص. للحصول على أرقام فعلية من مدارس حقيقية، قدّم طلبك مجانًا وسنرشح لك مدارس تناسب ميزانيتك بالضبط.",
  },
];

export default function CostGuidePage() {
  return (
    <GuideArticle
      path="/guides/flight-training-cost-south-africa"
      kicker="التكلفة بالتفصيل"
      title="كم تكلفة تعلم الطيران في جنوب أفريقيا؟"
      intro="هذا هو السؤال الذي يحدد قرار معظم الطلاب. إليك تفصيل حقيقي لكل بند من بنود التكلفة — بدون أرقام تسويقية مبهمة."
      faqItems={FAQ_ITEMS}
      related={[
        { title: "هل تعلّم الطيران غالي فعلاً؟ ولماذا؟", href: "/guides/why-is-flight-training-expensive" },
        { title: "الفرق بين PPL و CPL", href: "/guides/ppl-vs-cpl" },
        { title: "التأشيرة الدراسية لجنوب أفريقيا", href: "/guides/south-africa-study-visa" },
      ]}
    >
      <section id="breakdown">
        <h2 className="font-display text-2xl text-nino-ink">تفصيل بنود التكلفة</h2>
        <p className="mt-3">التكلفة الإجمالية لدراسة الطيران تتكون عمليًا من عدة بنود منفصلة، وليست رقمًا واحدًا فقط:</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>رسوم التدريب الأساسية:</strong> ساعات الطيران، المحاكي، والمواد النظرية — أكبر بند في الميزانية.</li>
          <li><strong>الكتب والمعدات:</strong> كتب دراسية، معدات ملاحية، وأحيانًا زي موحد.</li>
          <li><strong>الفحص الطبي:</strong> رسوم فحص الطيران الطبي المعتمد من SACAA.</li>
          <li><strong>التأشيرة:</strong> رسوم التقديم وأحيانًا رسوم الوكيل إن استخدمت واحدًا.</li>
          <li><strong>السكن والمعيشة:</strong> إيجار شهري، طعام، ومواصلات محلية طوال مدة برنامجك.</li>
          <li><strong>تذاكر السفر:</strong> رحلة الذهاب، وأي زيارات للوطن أثناء التدريب.</li>
        </ul>
      </section>

      <section id="by-license">
        <h2 className="font-display text-2xl text-nino-ink">التكلفة التقريبية حسب الرخصة</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-nino-line">
          <table className="w-full min-w-[420px] text-sm">
            <thead className="bg-nino-cream">
              <tr>
                <th className="p-3 text-start font-medium">الرخصة</th>
                <th className="p-3 text-start font-medium">التكلفة التقريبية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nino-line">
              <tr>
                <td className="p-3 text-nino-ink/60">PPL فقط</td>
                <td className="p-3">$15,000–25,000</td>
              </tr>
              <tr>
                <td className="p-3 text-nino-ink/60">مسار متكامل حتى CPL</td>
                <td className="p-3">$40,000–100,000</td>
              </tr>
              <tr>
                <td className="p-3 text-nino-ink/60">إضافة تصنيف آلي (IR)</td>
                <td className="p-3">$5,000–10,000 إضافية</td>
              </tr>
              <tr>
                <td className="p-3 text-nino-ink/60">إضافة متعدد المحركات (ME)</td>
                <td className="p-3">$4,000–8,000 إضافية</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-nino-ink/50">
          هذه أرقام تقريبية للمرجعية فقط — تختلف فعليًا بين المدارس وتتغير
          دوريًا حسب سعر الوقود والصيانة. راجع{" "}
          <Link href="/schools" className="text-nino-orange hover:underline">
            أسعار المدارس الفعلية
          </Link>{" "}
          للحصول على أرقام محدّثة.
        </p>
      </section>

      <section id="living-costs">
        <h2 className="font-display text-2xl text-nino-ink">تكلفة المعيشة والسكن</h2>
        <p className="mt-3">
          تختلف تكلفة السكن حسب المدينة ونمط الغرفة (خاصة، مشتركة، أو استوديو)،
          لكنها بشكل عام معقولة جدًا مقارنة بوجهات التدريب الأخرى. يمكنك{" "}
          <Link href="/accommodation" className="text-nino-orange hover:underline">
            تصفح خيارات السكن الفعلية والأسعار الشهرية
          </Link>{" "}
          بالقرب من كل مدرسة.
        </p>
      </section>

      <section id="plan">
        <h2 className="font-display text-2xl text-nino-ink">كيف تخطط لميزانيتك؟</h2>
        <p className="mt-3">
          الخطوة الأولى: حدد الرخصة المستهدفة بوضوح. الخطوة الثانية: استخدم{" "}
          <Link href="/calculator" className="text-nino-orange hover:underline">
            حاسبة التكلفة
          </Link>{" "}
          لتقدير مبدئي شامل يجمع التدريب والسكن والمعيشة معًا. الخطوة الثالثة:
          قدّم طلبك مجانًا لنطابقك مع مدارس حقيقية ضمن ميزانيتك الفعلية، بدلًا
          من التخمين بأرقام عامة.
        </p>
      </section>
    </GuideArticle>
  );
}
