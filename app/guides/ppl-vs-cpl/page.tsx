import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

const META = {
  ar: { title: "الفرق بين رخصة PPL و CPL: أيهما تحتاج؟ | نينو إديوكيشن", description: "مقارنة شاملة بين رخصة الطيار الخاص (PPL) ورخصة الطيار التجاري (CPL): التكلفة، المتطلبات، ماذا تسمح لك بفعله، وأيهما تبدأ به." },
  en: { title: "PPL vs CPL: Which One Do You Need? | Nino Education", description: "A complete comparison between the Private Pilot License (PPL) and Commercial Pilot License (CPL): cost, requirements, what each lets you do, and which to start with." },
};

export async function generateMetadata() {
  const lang = await getLang();
  return { title: META[lang].title, description: META[lang].description, alternates: { canonical: `${SITE_URL}/guides/ppl-vs-cpl` } };
}

const FAQ_ITEMS = {
  ar: [
    { q: "هل يمكنني الحصول على CPL مباشرة بدون PPL؟", a: "لا، PPL هي دائمًا الخطوة الأولى. لا توجد مدرسة أو هيئة طيران تسمح بتخطيها — CPL مبني فعليًا فوق أساس ساعات ومهارات PPL. لكن المسار المتكامل يجمع كل الرخص في برنامج واحد متواصل، فلا تشعر عمليًا وكأنك 'توقفت' عند PPL." },
    { q: "كم ساعة طيران أحتاج لكل رخصة؟", a: "PPL يتطلب عادة 45 ساعة طيران كحد أدنى حسب معايير SACAA. CPL يتطلب حد أدنى أعلى بكثير، يصل غالبًا إلى 200 ساعة إجمالية (تشمل ساعات PPL)، حسب المسار وقواعد المدرسة." },
    { q: "هل PPL يسمح لي بالعمل كطيار؟", a: "لا. PPL رخصة شخصية بحتة — يمكنك الطيران لنفسك أو لعائلتك، لكن لا يمكنك تلقي أجر مقابل الطيران. للعمل كطيار محترف بأي شكل (نقل ركاب، شحن، تدريب)، تحتاج CPL على الأقل." },
    { q: "هل أحتاج IR أو ME أيضًا؟", a: "إذا كان هدفك النهائي العمل في شركة طيران، فنعم — تصنيف آلي (IR) ومتعدد المحركات (ME) شبه إلزاميين عمليًا لمعظم وظائف شركات الطيران، حتى لو لم تكن جزءًا رسميًا من متطلبات CPL نفسها." },
    { q: "أيهما أرخص، وهل يستحق الأمر البدء بـPPL فقط؟", a: "PPL وحده أرخص بكثير من مسار CPL الكامل، وهو خيار منطقي إذا كان هدفك الطيران كهواية فقط. لكن إذا كان هدفك النهائي الاحتراف، فالمسار المتكامل عادة أوفر من حيث التكلفة الإجمالية والوقت مقارنة بالبدء بـPPL منفصلًا ثم التفكير لاحقًا في CPL." },
  ],
  en: [
    { q: "Can I get a CPL directly without a PPL?", a: "No, the PPL is always the first step. No school or aviation authority allows skipping it — the CPL is actually built on top of the PPL's foundation of hours and skills. But an integrated path combines all licenses into one continuous program, so you don't practically feel like you 'stopped' at the PPL." },
    { q: "How many flight hours do I need for each license?", a: "A PPL typically requires a minimum of 45 flight hours under SACAA standards. A CPL requires a much higher minimum, often reaching 200 total hours (including PPL hours), depending on the path and the school's rules." },
    { q: "Does a PPL let me work as a pilot?", a: "No. A PPL is a purely personal license — you can fly for yourself or your family, but you can't be paid to fly. To work as a professional pilot in any capacity (carrying passengers, cargo, instructing), you need at least a CPL." },
    { q: "Do I also need an IR or ME?", a: "If your ultimate goal is working at an airline, then yes — Instrument Rating (IR) and Multi-Engine (ME) are practically near-mandatory for most airline jobs, even if they're not formally part of the CPL requirements themselves." },
    { q: "Which is cheaper, and is it worth starting with just a PPL?", a: "A PPL alone is much cheaper than the full CPL path, and it's a sensible choice if your goal is flying purely as a hobby. But if your ultimate goal is going professional, an integrated path is usually cheaper overall in cost and time compared to starting with a standalone PPL and thinking about the CPL later." },
  ],
};

function ArabicContent() {
  return (
    <>
      <section id="quick-answer">
        <h2 className="font-display text-2xl text-nino-ink">الإجابة السريعة</h2>
        <p className="mt-3">
          <strong>PPL (رخصة طيار خاص)</strong> هي نقطة البداية للجميع — تسمح لك بالطيران لأغراض شخصية فقط، بدون أجر. <strong>CPL (رخصة طيار تجاري)</strong>{" "}
          هي الرخصة التي تؤهلك فعليًا للعمل كطيار محترف ومتلقي أجر. لا يمكنك الحصول على CPL دون المرور بـPPL أولًا — فالفرق ليس &quot;إما/أو&quot;، بل تسلسل تدريجي.
        </p>
      </section>

      <section id="comparison-table">
        <h2 className="font-display text-2xl text-nino-ink">مقارنة جنبًا إلى جنب</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-nino-line">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="bg-nino-cream"><tr><th className="p-3 text-start font-medium">المعيار</th><th className="p-3 text-start font-medium">PPL</th><th className="p-3 text-start font-medium">CPL</th></tr></thead>
            <tbody className="divide-y divide-nino-line">
              <tr><td className="p-3 text-nino-ink/60">الهدف</td><td className="p-3">طيران شخصي / هواية</td><td className="p-3">العمل كطيار محترف</td></tr>
              <tr><td className="p-3 text-nino-ink/60">الحد الأدنى لساعات الطيران</td><td className="p-3">≈ 45 ساعة</td><td className="p-3">≈ 200 ساعة إجمالية</td></tr>
              <tr><td className="p-3 text-nino-ink/60">هل يسمح بأجر؟</td><td className="p-3">لا</td><td className="p-3">نعم</td></tr>
              <tr><td className="p-3 text-nino-ink/60">التكلفة التقريبية</td><td className="p-3">$15,000–25,000</td><td className="p-3">$40,000–100,000 (مسار كامل)</td></tr>
              <tr><td className="p-3 text-nino-ink/60">خطوة تالية منطقية</td><td className="p-3">CPL، أو التوقف هنا كهواية</td><td className="p-3">IR، ME، ثم شركات الطيران</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-nino-ink/50">
          أرقام تقريبية للمرجعية فقط — راجع{" "}<Link href="/calculator" className="text-nino-orange hover:underline">حاسبة التكلفة</Link>{" "}لتقدير أدق حسب المدرسة والمسار.
        </p>
      </section>

      <section id="which-to-choose">
        <h2 className="font-display text-2xl text-nino-ink">أي مسار تختار؟</h2>
        <p className="mt-3">إذا كان هدفك النهائي هو العمل كطيار — في شركة طيران، أو كطيار خاص لشركة، أو حتى مدرب طيران — فابدأ مباشرة بمسار متكامل يجمع PPL وCPL (وعادة IR وME أيضًا) في برنامج واحد متواصل. هذا عادة أوفر وقتًا وتكلفة من التوقف عند PPL ثم العودة لاحقًا لإكمال المسار.</p>
        <p className="mt-3">أما إذا كان هدفك الطيران كهواية فقط بدون نية العمل بأجر، فـPPL وحده خيار كافٍ ومنطقي من ناحية التكلفة.</p>
        <p className="mt-3">
          تقدر{" "}<Link href="/quiz" className="text-nino-orange hover:underline">تجرب أداة البحث عن مدرستك المناسبة</Link>{" "}لو ما كنت متأكد أي مسار يناسب وضعك وميزانيتك.
        </p>
      </section>
    </>
  );
}

function EnglishContent() {
  return (
    <>
      <section id="quick-answer">
        <h2 className="font-display text-2xl text-nino-ink">The Quick Answer</h2>
        <p className="mt-3">
          <strong>PPL (Private Pilot License)</strong> is the starting point for everyone — it lets you fly for personal purposes only, unpaid. <strong>CPL (Commercial Pilot License)</strong>{" "}
          is the license that actually qualifies you to work as a paid, professional pilot. You can&apos;t get a CPL without going through a PPL first — the difference isn&apos;t &quot;either/or,&quot; it&apos;s a gradual sequence.
        </p>
      </section>

      <section id="comparison-table">
        <h2 className="font-display text-2xl text-nino-ink">Side-by-Side Comparison</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-nino-line">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="bg-nino-cream"><tr><th className="p-3 text-start font-medium">Criteria</th><th className="p-3 text-start font-medium">PPL</th><th className="p-3 text-start font-medium">CPL</th></tr></thead>
            <tbody className="divide-y divide-nino-line">
              <tr><td className="p-3 text-nino-ink/60">Purpose</td><td className="p-3">Personal flying / hobby</td><td className="p-3">Working as a professional pilot</td></tr>
              <tr><td className="p-3 text-nino-ink/60">Minimum flight hours</td><td className="p-3">≈ 45 hours</td><td className="p-3">≈ 200 total hours</td></tr>
              <tr><td className="p-3 text-nino-ink/60">Allows paid flying?</td><td className="p-3">No</td><td className="p-3">Yes</td></tr>
              <tr><td className="p-3 text-nino-ink/60">Approximate cost</td><td className="p-3">$15,000–25,000</td><td className="p-3">$40,000–100,000 (full path)</td></tr>
              <tr><td className="p-3 text-nino-ink/60">Logical next step</td><td className="p-3">CPL, or stop here as a hobby</td><td className="p-3">IR, ME, then airlines</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-nino-ink/50">
          Approximate reference figures only — see the{" "}<Link href="/en/calculator" className="text-nino-orange hover:underline">cost calculator</Link>{" "}for a more accurate estimate by school and path.
        </p>
      </section>

      <section id="which-to-choose">
        <h2 className="font-display text-2xl text-nino-ink">Which Path Should You Choose?</h2>
        <p className="mt-3">If your ultimate goal is working as a pilot — at an airline, as a corporate pilot, or even a flight instructor — start directly with an integrated path combining PPL and CPL (and usually IR and ME too) in one continuous program. This is usually cheaper and faster than stopping at PPL and coming back later to complete the path.</p>
        <p className="mt-3">But if your goal is flying purely as a hobby with no intention of paid work, a PPL alone is a sufficient, cost-sensible choice.</p>
        <p className="mt-3">
          You can{" "}<Link href="/en/quiz" className="text-nino-orange hover:underline">try the Find My School tool</Link>{" "}if you&apos;re not sure which path fits your situation and budget.
        </p>
      </section>
    </>
  );
}

export default async function PplVsCplPage() {
  const lang: Lang = await getLang();
  const kicker = lang === "ar" ? "مقارنة رخص الطيران" : "Comparing Pilot Licenses";
  const title = lang === "ar" ? "الفرق بين PPL و CPL: أيهما تحتاج فعلًا؟" : "PPL vs CPL: Which One Do You Actually Need?";
  const intro = lang === "ar"
    ? "هذا أكثر سؤال يسأله كل طالب جديد قبل حتى اختيار مدرسة. الفرق ليس فقط في الاسم — بل في التكلفة، المدة، وما يُسمح لك بفعله بعد التخرج."
    : "This is the most common question every new student asks before even choosing a school. The difference isn't just in the name — it's in the cost, duration, and what you're allowed to do after graduating.";
  const related = lang === "ar"
    ? [
        { title: "دراسة الطيران في جنوب أفريقيا: الدليل الشامل", href: "/guides/study-aviation-in-south-africa" },
        { title: "كم تستغرق مدة دراسة الطيران؟", href: "/guides/how-long-to-become-a-pilot" },
        { title: "كم تكلفة تعلم الطيران في جنوب أفريقيا؟", href: "/guides/flight-training-cost-south-africa" },
      ]
    : [
        { title: "Studying Aviation in South Africa: The Complete Guide", href: "/en/guides/study-aviation-in-south-africa" },
        { title: "How Long Does Aviation Training Take?", href: "/en/guides/how-long-to-become-a-pilot" },
        { title: "How Much Does Flight Training Cost in South Africa?", href: "/en/guides/flight-training-cost-south-africa" },
      ];

  return (
    <GuideArticle path="/guides/ppl-vs-cpl" lang={lang} kicker={kicker} title={title} intro={intro} faqItems={FAQ_ITEMS[lang]} related={related}>
      {lang === "ar" ? <ArabicContent /> : <EnglishContent />}
    </GuideArticle>
  );
}
