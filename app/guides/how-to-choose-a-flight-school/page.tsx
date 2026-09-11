import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

const META = {
  ar: { title: "كيف تختار أفضل مدرسة طيران في جنوب أفريقيا؟ | نينو إديوكيشن", description: "معايير عملية لاختيار مدرسة الطيران المناسبة: الاعتماد، الأسطول، الموقع، السعر، ونسبة نجاح الخريجين — وليس فقط الاسم الأشهر." },
  en: { title: "How to Choose the Best Flight School in South Africa | Nino Education", description: "Practical criteria for choosing the right flight school: accreditation, fleet, location, price, and graduate success rate — not just name recognition." },
};

export async function generateMetadata() {
  const lang = await getLang();
  return { title: META[lang].title, description: META[lang].description, alternates: { canonical: `${SITE_URL}/guides/how-to-choose-a-flight-school` } };
}

const FAQ_ITEMS = {
  ar: [
    { q: "هل المدرسة الأشهر هي الأفضل دائمًا؟", a: "ليس بالضرورة. الشهرة قد تعني ازدحامًا أكبر (وبالتالي انتظارًا أطول للطائرات والمدربين)، بينما مدرسة أصغر وأقل شهرة قد تقدم اهتمامًا فرديًا أكبر وجدولة أسرع. المعايير العملية أهم من الاسم وحده." },
    { q: "كيف أتأكد أن المدرسة معتمدة فعليًا؟", a: "اطلب رقم اعتماد SACAA الرسمي للمدرسة وتحقق منه مباشرة، أو استخدم مدارس تم التحقق منها مسبقًا مثل المدارس المدرجة على منصتنا، حيث نراجع كل مدرسة يدويًا قبل نشرها." },
    { q: "هل يجب أن أزور المدرسة قبل التسجيل؟", a: "الزيارة الشخصية مثالية لكنها غير ممكنة لمعظم الطلاب الدوليين. البديل العملي: اطلب مكالمة فيديو، اسأل عن التواصل مع طلاب حاليين أو خريجين، وراجع الأسطول والمرافق عبر الصور والفيديوهات الحديثة." },
    { q: "هل السعر الأرخص يعني جودة أقل؟", a: "ليس بالضرورة، لكن سعرًا أقل بشكل ملحوظ عن متوسط السوق يستحق سؤالًا مباشرًا: هل السعر شامل كل شيء؟ أحيانًا يكون الفرق في استبعاد بنود ستدفعها لاحقًا بشكل منفصل." },
    { q: "ماذا لو غيّرت رأيي بعد التسجيل في مدرسة؟", a: "هذا مكلف وصعب لوجستيًا (تأشيرة، سكن، دفعات مسبقة)، لذا الهدف من هذا الدليل هو مساعدتك على اتخاذ قرار صحيح من المرة الأولى بدلًا من التصحيح لاحقًا." },
  ],
  en: [
    { q: "Is the most famous school always the best?", a: "Not necessarily. Fame can mean more crowding (and therefore longer waits for aircraft and instructors), while a smaller, less well-known school might offer more individual attention and faster scheduling. Practical criteria matter more than name alone." },
    { q: "How do I make sure a school is actually accredited?", a: "Ask for the school's official SACAA accreditation number and verify it directly, or use pre-verified schools like the ones listed on our platform, where we manually review every school before publishing it." },
    { q: "Should I visit the school before enrolling?", a: "An in-person visit is ideal but not possible for most international students. The practical alternative: request a video call, ask about connecting with current or former students, and review the fleet and facilities through recent photos and videos." },
    { q: "Does a cheaper price mean lower quality?", a: "Not necessarily, but a price notably lower than the market average deserves a direct question: is this price all-inclusive? Sometimes the difference is excluded items you'll pay for separately later." },
    { q: "What if I change my mind after enrolling at a school?", a: "This is costly and logistically difficult (visa, housing, upfront payments), which is why the goal of this guide is helping you make the right decision the first time instead of correcting it later." },
  ],
};

function ArabicContent() {
  return (
    <>
      <section id="accreditation">
        <h2 className="font-display text-2xl text-nino-ink">الاعتماد الرسمي أولًا، بلا استثناء</h2>
        <p className="mt-3">
          قبل أي معيار آخر، تأكد أن المدرسة معتمدة رسميًا من SACAA. هذا ليس تفصيلًا شكليًا — بدونه، رخصتك النهائية قد لا تكون معترفًا بها دوليًا على الإطلاق. راجع{" "}
          <Link href="/guides/sacaa-medical-requirements" className="text-nino-orange hover:underline">دليل متطلبات SACAA</Link>{" "}لفهم دور هذه الهيئة بالتفصيل.
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
          لا تكتفِ بمدرسة واحدة. استخدم{" "}<Link href="/schools" className="text-nino-orange hover:underline">صفحة المدارس</Link>{" "}لفلترة الخيارات حسب ميزانيتك ورخصتك المستهدفة، ثم استخدم أداة{" "}
          <Link href="/schools/compare" className="text-nino-orange hover:underline">المقارنة المباشرة</Link>{" "}لوضع مدرستين أو أكثر جنبًا إلى جنب بالأرقام الفعلية.
        </p>
      </section>

      <section id="not-sure">
        <h2 className="font-display text-2xl text-nino-ink">لست متأكدًا من أين تبدأ؟</h2>
        <p className="mt-3">
          جرّب{" "}<Link href="/quiz" className="text-nino-orange hover:underline">أداة البحث عن مدرستك المناسبة</Link>{" "}— ثلاثة أسئلة سريعة عن هدفك وميزانيتك، وتحصل على ترشيحات مباشرة بدلًا من مراجعة عشرات المدارس يدويًا.
        </p>
      </section>
    </>
  );
}

function EnglishContent() {
  return (
    <>
      <section id="accreditation">
        <h2 className="font-display text-2xl text-nino-ink">Official Accreditation First, No Exceptions</h2>
        <p className="mt-3">
          Before any other criterion, make sure the school is officially SACAA-accredited. This isn&apos;t a formality — without it, your final license might not be internationally recognized at all. See the{" "}
          <Link href="/en/guides/sacaa-medical-requirements" className="text-nino-orange hover:underline">SACAA requirements guide</Link>{" "}to understand this authority&apos;s role in detail.
        </p>
      </section>

      <section id="criteria">
        <h2 className="font-display text-2xl text-nino-ink">Practical Criteria for Comparison</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>Fleet:</strong> Number of aircraft versus number of students — a small fleet with many students means longer waits.</li>
          <li><strong>Location and weather:</strong> Some areas allow more flying days per year than others.</li>
          <li><strong>Price structure:</strong> Is it all-inclusive, or does it have separate fees for exams and equipment?</li>
          <li><strong>International student support:</strong> Do they have actual experience with Arab or international students before?</li>
          <li><strong>Nearby housing availability:</strong> Saves you time and extra coordination.</li>
          <li><strong>Response speed:</strong> How does the school respond to your questions right now? A good indicator of what comes after enrolling.</li>
        </ul>
      </section>

      <section id="compare">
        <h2 className="font-display text-2xl text-nino-ink">Compare More Than One School Before Deciding</h2>
        <p className="mt-3">
          Don&apos;t settle for just one school. Use the{" "}<Link href="/en/schools" className="text-nino-orange hover:underline">schools page</Link>{" "}to filter options by your budget and target license, then use the{" "}
          <Link href="/en/schools/compare" className="text-nino-orange hover:underline">direct comparison tool</Link>{" "}to put two or more schools side by side with actual numbers.
        </p>
      </section>

      <section id="not-sure">
        <h2 className="font-display text-2xl text-nino-ink">Not Sure Where to Start?</h2>
        <p className="mt-3">
          Try the{" "}<Link href="/en/quiz" className="text-nino-orange hover:underline">Find My School tool</Link>{" "}— three quick questions about your goal and budget, and you get direct recommendations instead of manually reviewing dozens of schools.
        </p>
      </section>
    </>
  );
}

export default async function ChooseSchoolGuidePage() {
  const lang: Lang = await getLang();
  const kicker = lang === "ar" ? "اختيار المدرسة الصحيحة" : "Choosing the Right School";
  const title = lang === "ar" ? "كيف تختار أفضل مدرسة طيران في جنوب أفريقيا؟" : "How to Choose the Best Flight School in South Africa";
  const intro = lang === "ar"
    ? "أكثر من 30 مدرسة معتمدة تعمل في جنوب أفريقيا. إليك المعايير العملية التي تفرّق فعليًا بين خيار جيد وخيار قد تندم عليه."
    : "More than 30 accredited schools operate in South Africa. Here are the practical criteria that actually separate a good choice from one you might regret.";
  const related = lang === "ar"
    ? [
        { title: "الفرق بين PPL و CPL", href: "/guides/ppl-vs-cpl" },
        { title: "كم تكلفة تعلم الطيران في جنوب أفريقيا؟", href: "/guides/flight-training-cost-south-africa" },
        { title: "مشاكل قد تواجهك أثناء البرنامج", href: "/guides/common-challenges-flight-training" },
      ]
    : [
        { title: "PPL vs CPL", href: "/en/guides/ppl-vs-cpl" },
        { title: "How Much Does Flight Training Cost in South Africa?", href: "/en/guides/flight-training-cost-south-africa" },
        { title: "Challenges You Might Face During Your Program", href: "/en/guides/common-challenges-flight-training" },
      ];

  return (
    <GuideArticle path="/guides/how-to-choose-a-flight-school" lang={lang} kicker={kicker} title={title} intro={intro} faqItems={FAQ_ITEMS[lang]} related={related}>
      {lang === "ar" ? <ArabicContent /> : <EnglishContent />}
    </GuideArticle>
  );
}
