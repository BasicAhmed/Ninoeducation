import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

const META = {
  ar: {
    title: "كم تكلفة تعلم الطيران في جنوب أفريقيا؟ (2026) | نينو إديوكيشن",
    description: "تفصيل كامل لتكلفة دراسة الطيران في جنوب أفريقيا: رسوم التدريب، السكن، المعيشة، التأشيرة، وكيف تخطط لميزانيتك بدون مفاجآت.",
  },
  en: {
    title: "How Much Does Flight Training Cost in South Africa? (2026) | Nino Education",
    description: "A complete breakdown of the cost of studying aviation in South Africa: training fees, housing, living, visa, and how to plan your budget without surprises.",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return { title: META[lang].title, description: META[lang].description, alternates: { canonical: `${SITE_URL}/guides/flight-training-cost-south-africa` } };
}

const FAQ_ITEMS = {
  ar: [
    { q: "هل الأسعار المعلنة من المدارس تشمل كل شيء؟", a: "غالبًا لا. معظم المدارس تعلن سعر التدريب الأساسي فقط (ساعات الطيران والمواد النظرية)، بينما تُحسب رسوم الفحوصات، الكتب، والمعدات الشخصية بشكل منفصل أحيانًا. اسأل دائمًا 'هل هذا السعر شامل كل شيء؟' قبل الالتزام." },
    { q: "هل يمكن أن ترتفع التكلفة أثناء التدريب؟", a: "نعم، وهذا شائع أكثر مما يتوقع الطلاب. إذا احتجت ساعات طيران إضافية عن الحد الأدنى (بسبب سرعة التعلم الفردية أو تأجيل الطيران لأسباب جوية)، تُحسب هذه الساعات الإضافية بشكل منفصل. من المهم تخصيص هامش احتياطي في ميزانيتك." },
    { q: "هل توجد خيارات تمويل أو تقسيط؟", a: "تختلف السياسة من مدرسة لأخرى — بعضها يسمح بالدفع على دفعات مرتبطة بمراحل التدريب بدلًا من دفعة واحدة كاملة مقدمًا. اسأل عن هذا تحديدًا عند المقارنة، فهو يؤثر كثيرًا على التخطيط المالي." },
    { q: "هل تكلفة المعيشة في جنوب أفريقيا مرتفعة؟", a: "لا، بشكل عام تكلفة المعيشة في جنوب أفريقيا أقل بكثير من أوروبا أو أمريكا الشمالية، وأقل من كثير من الدول العربية أيضًا. السكن، الطعام، والمواصلات المحلية معقولة نسبيًا خاصة في المدن الأصغر القريبة من مراكز التدريب." },
    { q: "كيف أحصل على تقدير دقيق لميزانيتي؟", a: "استخدم حاسبة التكلفة على الموقع لإدخال أهدافك (الرخصة المستهدفة، مدة الإقامة، نمط السكن المفضل)، وستحصل على تقدير مخصص. للحصول على أرقام فعلية من مدارس حقيقية، قدّم طلبك مجانًا وسنرشح لك مدارس تناسب ميزانيتك بالضبط." },
  ],
  en: [
    { q: "Do the prices schools advertise include everything?", a: "Often not. Most schools advertise only the base training price (flight hours and theory materials), while exam fees, books, and personal equipment are sometimes billed separately. Always ask 'does this price include everything?' before committing." },
    { q: "Can the cost increase during training?", a: "Yes, and this is more common than students expect. If you need flight hours beyond the minimum (due to individual learning pace or weather-related flight delays), these extra hours are billed separately. It's important to set aside a buffer margin in your budget." },
    { q: "Are there financing or installment options?", a: "Policy varies by school — some allow payment in installments tied to training stages instead of one full payment upfront. Ask about this specifically when comparing, since it significantly affects financial planning." },
    { q: "Is the cost of living in South Africa high?", a: "No, cost of living in South Africa is generally much lower than Europe or North America, and lower than many Arab countries too. Housing, food, and local transport are relatively reasonable, especially in smaller cities near training centers." },
    { q: "How do I get an accurate estimate for my budget?", a: "Use the cost calculator on the site to enter your goals (target license, length of stay, preferred housing style), and you'll get a tailored estimate. For actual figures from real schools, submit your free application and we'll recommend schools that fit your exact budget." },
  ],
};

function ArabicContent() {
  return (
    <>
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
              <tr><th className="p-3 text-start font-medium">الرخصة</th><th className="p-3 text-start font-medium">التكلفة التقريبية</th></tr>
            </thead>
            <tbody className="divide-y divide-nino-line">
              <tr><td className="p-3 text-nino-ink/60">PPL فقط</td><td className="p-3">$15,000–25,000</td></tr>
              <tr><td className="p-3 text-nino-ink/60">مسار متكامل حتى CPL</td><td className="p-3">$40,000–100,000</td></tr>
              <tr><td className="p-3 text-nino-ink/60">إضافة تصنيف آلي (IR)</td><td className="p-3">$5,000–10,000 إضافية</td></tr>
              <tr><td className="p-3 text-nino-ink/60">إضافة متعدد المحركات (ME)</td><td className="p-3">$4,000–8,000 إضافية</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-nino-ink/50">
          هذه أرقام تقريبية للمرجعية فقط — تختلف فعليًا بين المدارس وتتغير دوريًا حسب سعر الوقود والصيانة. راجع{" "}
          <Link href="/schools" className="text-nino-orange hover:underline">أسعار المدارس الفعلية</Link>{" "}للحصول على أرقام محدّثة.
        </p>
      </section>

      <section id="living-costs">
        <h2 className="font-display text-2xl text-nino-ink">تكلفة المعيشة والسكن</h2>
        <p className="mt-3">
          تختلف تكلفة السكن حسب المدينة ونمط الغرفة (خاصة، مشتركة، أو استوديو)، لكنها بشكل عام معقولة جدًا مقارنة بوجهات التدريب الأخرى. يمكنك{" "}
          <Link href="/accommodation" className="text-nino-orange hover:underline">تصفح خيارات السكن الفعلية والأسعار الشهرية</Link>{" "}بالقرب من كل مدرسة.
        </p>
      </section>

      <section id="plan">
        <h2 className="font-display text-2xl text-nino-ink">كيف تخطط لميزانيتك؟</h2>
        <p className="mt-3">
          الخطوة الأولى: حدد الرخصة المستهدفة بوضوح. الخطوة الثانية: استخدم{" "}
          <Link href="/calculator" className="text-nino-orange hover:underline">حاسبة التكلفة</Link>{" "}لتقدير مبدئي شامل يجمع التدريب والسكن والمعيشة معًا. الخطوة الثالثة: قدّم طلبك مجانًا لنطابقك مع مدارس حقيقية ضمن ميزانيتك الفعلية، بدلًا من التخمين بأرقام عامة.
        </p>
      </section>
    </>
  );
}

function EnglishContent() {
  return (
    <>
      <section id="breakdown">
        <h2 className="font-display text-2xl text-nino-ink">Breaking Down the Cost Items</h2>
        <p className="mt-3">The total cost of studying aviation is actually made up of several separate line items, not just one number:</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>Base training fees:</strong> Flight hours, simulator, and theory materials — the largest line item in the budget.</li>
          <li><strong>Books and equipment:</strong> Textbooks, navigation equipment, and sometimes a uniform.</li>
          <li><strong>Medical exam:</strong> Fees for the SACAA-approved aviation medical exam.</li>
          <li><strong>Visa:</strong> Application fees and sometimes agent fees if you use one.</li>
          <li><strong>Housing and living:</strong> Monthly rent, food, and local transport for the duration of your program.</li>
          <li><strong>Travel tickets:</strong> Your outbound flight, and any trips home during training.</li>
        </ul>
      </section>

      <section id="by-license">
        <h2 className="font-display text-2xl text-nino-ink">Approximate Cost by License</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-nino-line">
          <table className="w-full min-w-[420px] text-sm">
            <thead className="bg-nino-cream">
              <tr><th className="p-3 text-start font-medium">License</th><th className="p-3 text-start font-medium">Approximate Cost</th></tr>
            </thead>
            <tbody className="divide-y divide-nino-line">
              <tr><td className="p-3 text-nino-ink/60">PPL alone</td><td className="p-3">$15,000–25,000</td></tr>
              <tr><td className="p-3 text-nino-ink/60">Integrated path through CPL</td><td className="p-3">$40,000–100,000</td></tr>
              <tr><td className="p-3 text-nino-ink/60">Adding Instrument Rating (IR)</td><td className="p-3">$5,000–10,000 extra</td></tr>
              <tr><td className="p-3 text-nino-ink/60">Adding Multi-Engine (ME)</td><td className="p-3">$4,000–8,000 extra</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-nino-ink/50">
          These are approximate reference figures only — actual figures vary between schools and change periodically based on fuel and maintenance prices. See{" "}
          <Link href="/en/schools" className="text-nino-orange hover:underline">actual school prices</Link>{" "}for up-to-date numbers.
        </p>
      </section>

      <section id="living-costs">
        <h2 className="font-display text-2xl text-nino-ink">Cost of Living and Housing</h2>
        <p className="mt-3">
          Housing cost varies by city and room style (private, shared, or studio), but is generally very reasonable compared to other training destinations. You can{" "}
          <Link href="/en/accommodation" className="text-nino-orange hover:underline">browse actual housing options and monthly prices</Link>{" "}near each school.
        </p>
      </section>

      <section id="plan">
        <h2 className="font-display text-2xl text-nino-ink">How Do You Plan Your Budget?</h2>
        <p className="mt-3">
          Step one: clearly define your target license. Step two: use the{" "}
          <Link href="/en/calculator" className="text-nino-orange hover:underline">cost calculator</Link>{" "}for an initial comprehensive estimate combining training, housing, and living. Step three: submit your free application so we can match you with real schools within your actual budget, instead of guessing with generic numbers.
        </p>
      </section>
    </>
  );
}

export default async function CostGuidePage() {
  const lang: Lang = await getLang();
  const kicker = lang === "ar" ? "التكلفة بالتفصيل" : "The Cost, In Detail";
  const title = lang === "ar" ? "كم تكلفة تعلم الطيران في جنوب أفريقيا؟" : "How Much Does Flight Training Cost in South Africa?";
  const intro = lang === "ar"
    ? "هذا هو السؤال الذي يحدد قرار معظم الطلاب. إليك تفصيل حقيقي لكل بند من بنود التكلفة — بدون أرقام تسويقية مبهمة."
    : "This is the question that determines most students' decision. Here's a real breakdown of every cost item — without vague marketing numbers.";

  const related = lang === "ar"
    ? [
        { title: "هل تعلّم الطيران غالي فعلاً؟ ولماذا؟", href: "/guides/why-is-flight-training-expensive" },
        { title: "الفرق بين PPL و CPL", href: "/guides/ppl-vs-cpl" },
        { title: "التأشيرة الدراسية لجنوب أفريقيا", href: "/guides/south-africa-study-visa" },
      ]
    : [
        { title: "Is Flight Training Really Expensive? And Why?", href: "/en/guides/why-is-flight-training-expensive" },
        { title: "PPL vs CPL", href: "/en/guides/ppl-vs-cpl" },
        { title: "South Africa's Study Visa", href: "/en/guides/south-africa-study-visa" },
      ];

  return (
    <GuideArticle path="/guides/flight-training-cost-south-africa" lang={lang} kicker={kicker} title={title} intro={intro} faqItems={FAQ_ITEMS[lang]} related={related}>
      {lang === "ar" ? <ArabicContent /> : <EnglishContent />}
    </GuideArticle>
  );
}
