import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

const META = {
  ar: { title: "كم تستغرق مدة دراسة الطيران حتى الاحتراف؟ | نينو إديوكيشن", description: "جدول زمني واقعي لدراسة الطيران في جنوب أفريقيا: من أول يوم تدريب حتى رخصة الطيار التجاري، وما يؤثر على المدة الفعلية." },
  en: { title: "How Long Does It Take to Become a Professional Pilot? | Nino Education", description: "A realistic timeline for studying aviation in South Africa: from the first day of training to a Commercial Pilot License, and what affects the actual duration." },
};

export async function generateMetadata() {
  const lang = await getLang();
  return { title: META[lang].title, description: META[lang].description, alternates: { canonical: `${SITE_URL}/guides/how-long-to-become-a-pilot` } };
}

const FAQ_ITEMS = {
  ar: [
    { q: "هل يمكن إنهاء التدريب أسرع من 12 شهرًا؟", a: "نظريًا نعم إذا كان الطالب مستعدًا للطيران بشكل شبه يومي دون انقطاع، لكن عمليًا نادرًا ما يحدث هذا بسبب الطقس، جدولة المدرب، وصيانة الطائرات. 12 شهرًا هو الحد الأدنى الواقعي لمعظم الطلاب في مسار متكامل." },
    { q: "ما الذي يؤخر التدريب أكثر من غيره؟", a: "أكثر الأسباب شيوعًا: الطقس غير المناسب في بعض الفترات، انتظار الدور على الطائرة أو المحاكي في مدرسة مزدحمة، وأحيانًا الحاجة لساعات طيران إضافية عن الحد الأدنى لإتقان مهارة معينة." },
    { q: "هل المسار المعياري أطول من المتكامل دائمًا؟", a: "غالبًا نعم، لأن المسار المعياري (رخصة تلو الأخرى بفواصل زمنية) يعتمد على تجميع الساعات تدريجيًا، أحيانًا بين رحلات متباعدة على مدى سنوات. المسار المتكامل مصمم للتدريب المتواصل، فهو أسرع في العادة." },
    { q: "هل عمري يؤثر على مدة أو إمكانية التدريب؟", a: "لا يوجد سن أقصى قانوني لبدء PPL، لكن رخصة CPL تتطلب حدًا أدنى للعمر (18 عامًا عادة). التعلم نفسه ممكن في أي عمر بالغ، والمدة لا تختلف بشكل جوهري بسبب العمر وحده." },
    { q: "متى أبدأ بالتقديم على وظائف بعد التخرج؟", a: "يمكنك البدء بالتقديم فور حصولك على CPL، لكن كثيرًا من شركات الطيران تفضل طيارين بساعات طيران أعلى من الحد الأدنى. كثير من الخريجين الجدد يعملون كمدربي طيران أولًا لتجميع ساعات إضافية قبل الانتقال لشركات الطيران الكبرى." },
  ],
  en: [
    { q: "Can training finish faster than 12 months?", a: "Theoretically yes, if the student is ready to fly nearly daily with no interruption, but this practically rarely happens due to weather, instructor scheduling, and aircraft maintenance. 12 months is the realistic minimum for most students in an integrated path." },
    { q: "What delays training the most?", a: "The most common reasons: unsuitable weather during certain periods, waiting for turns on the aircraft or simulator at a busy school, and sometimes needing extra flight hours beyond the minimum to master a particular skill." },
    { q: "Is the modular path always longer than the integrated one?", a: "Usually yes, because the modular path (one license after another, spaced out over time) depends on gradually building up hours, sometimes between spaced-out flights over years. The integrated path is designed for continuous training, so it's usually faster." },
    { q: "Does my age affect training duration or eligibility?", a: "There's no legal maximum age to start a PPL, but a CPL requires a minimum age (usually 18). Learning itself is possible at any adult age, and duration doesn't fundamentally differ due to age alone." },
    { q: "When do I start applying for jobs after graduating?", a: "You can start applying as soon as you get your CPL, but many airlines prefer pilots with flight hours above the minimum. Many new graduates work as flight instructors first to build additional hours before moving to major airlines." },
  ],
};

function ArabicContent() {
  return (
    <>
      <section id="typical-timeline">
        <h2 className="font-display text-2xl text-nino-ink">الجدول الزمني النموذجي</h2>
        <p className="mt-3">لبرنامج متكامل من الصفر حتى رخصة CPL، يسير التسلسل التقريبي هكذا:</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>الشهر 1–3:</strong> التأسيس النظري وأولى ساعات الطيران، وصولًا لأول رحلة منفردة (Solo Flight).</li>
          <li><strong>الشهر 3–6:</strong> إكمال متطلبات PPL والاختبار العملي للحصول على الرخصة.</li>
          <li><strong>الشهر 6–10:</strong> تصنيف آلي (IR) ومتعدد المحركات (ME)، وتراكم ساعات الطيران.</li>
          <li><strong>الشهر 10–18:</strong> استكمال ساعات CPL المطلوبة والاختبار النهائي.</li>
        </ul>
        <p className="mt-3 text-xs text-nino-ink/50">جدول تقريبي للمرجعية — يختلف الترتيب والتوقيت الفعلي بين المدارس.</p>
      </section>

      <section id="what-affects-duration">
        <h2 className="font-display text-2xl text-nino-ink">ما الذي يؤثر فعليًا على المدة؟</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>الطقس:</strong> حتى في جنوب أفريقيا (رغم طقسها المناسب معظم السنة)، توجد فترات موسمية أقل ملاءمة للطيران.</li>
          <li><strong>ازدحام المدرسة:</strong> عدد الطائرات والمدربين المتاحين مقابل عدد الطلاب يؤثر على سرعة الحجز والتقدم.</li>
          <li><strong>وتيرة تعلم الطالب:</strong> بعض الطلاب يحتاجون ساعات إضافية لإتقان مهارة معينة قبل الانتقال للمرحلة التالية.</li>
          <li><strong>المسار المختار:</strong> المتكامل عادة أسرع من المعياري، كما ذكرنا في{" "}<Link href="/guides/ppl-vs-cpl" className="text-nino-orange hover:underline">دليل الفرق بين PPL وCPL</Link>.</li>
        </ul>
      </section>

      <section id="after-cpl">
        <h2 className="font-display text-2xl text-nino-ink">ماذا بعد الحصول على CPL؟</h2>
        <p className="mt-3">كثير من الخريجين الجدد يعملون كمدربي طيران في المدرسة نفسها أو مدرسة أخرى لتجميع ساعات طيران إضافية، وهي خطوة شائعة جدًا قبل التقديم على شركات الطيران الكبرى التي تفضل عادة طيارين بساعات أعلى من الحد الأدنى القانوني.</p>
      </section>

      <section id="plan-your-timeline">
        <h2 className="font-display text-2xl text-nino-ink">كيف تخطط لجدولك الزمني؟</h2>
        <p className="mt-3">
          حدد هدفك النهائي بوضوح أولًا (هل تريد التوقف عند PPL أم الوصول لـCPL؟ راجع{" "}
          <Link href="/guides/ppl-vs-cpl" className="text-nino-orange hover:underline">دليل المقارنة</Link>{" "}إن لم تكن متأكدًا)، ثم اختر مدرسة بمسار يناسب هذا الهدف والوقت المتاح لديك.{" "}
          <Link href="/apply" className="text-nino-orange hover:underline">قدّم طلبك المجاني</Link>{" "}وسنساعدك في مطابقة جدولك الزمني مع مدرسة مناسبة فعليًا، لا فقط نظريًا.
        </p>
      </section>
    </>
  );
}

function EnglishContent() {
  return (
    <>
      <section id="typical-timeline">
        <h2 className="font-display text-2xl text-nino-ink">The Typical Timeline</h2>
        <p className="mt-3">For an integrated program from zero through a CPL, the approximate sequence goes like this:</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>Months 1–3:</strong> Theoretical foundation and first flight hours, leading up to your first solo flight.</li>
          <li><strong>Months 3–6:</strong> Completing PPL requirements and the practical exam to get the license.</li>
          <li><strong>Months 6–10:</strong> Instrument Rating (IR) and Multi-Engine (ME), and building up flight hours.</li>
          <li><strong>Months 10–18:</strong> Completing required CPL hours and the final exam.</li>
        </ul>
        <p className="mt-3 text-xs text-nino-ink/50">An approximate reference timeline — the actual order and timing varies between schools.</p>
      </section>

      <section id="what-affects-duration">
        <h2 className="font-display text-2xl text-nino-ink">What Actually Affects Duration?</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>Weather:</strong> Even in South Africa (despite its suitable weather most of the year), there are seasonal periods less suited to flying.</li>
          <li><strong>School crowding:</strong> The number of available aircraft and instructors versus the number of students affects booking speed and progress.</li>
          <li><strong>Student learning pace:</strong> Some students need extra hours to master a particular skill before moving to the next stage.</li>
          <li><strong>The chosen path:</strong> Integrated is usually faster than modular, as mentioned in the{" "}<Link href="/en/guides/ppl-vs-cpl" className="text-nino-orange hover:underline">PPL vs CPL guide</Link>.</li>
        </ul>
      </section>

      <section id="after-cpl">
        <h2 className="font-display text-2xl text-nino-ink">What Happens After Getting a CPL?</h2>
        <p className="mt-3">Many new graduates work as flight instructors at the same school or another one to build additional flight hours, a very common step before applying to major airlines, which usually prefer pilots with hours above the legal minimum.</p>
      </section>

      <section id="plan-your-timeline">
        <h2 className="font-display text-2xl text-nino-ink">How Do You Plan Your Timeline?</h2>
        <p className="mt-3">
          First, clearly define your ultimate goal (do you want to stop at PPL or go for a CPL? See the{" "}
          <Link href="/en/guides/ppl-vs-cpl" className="text-nino-orange hover:underline">comparison guide</Link>{" "}if you&apos;re not sure), then choose a school with a path that fits that goal and your available time.{" "}
          <Link href="/en/apply" className="text-nino-orange hover:underline">Submit your free application</Link>{" "}and we&apos;ll help you match your timeline with a school that genuinely fits, not just in theory.
        </p>
      </section>
    </>
  );
}

export default async function TimelineGuidePage() {
  const lang: Lang = await getLang();
  const kicker = lang === "ar" ? "الجدول الزمني الواقعي" : "The Realistic Timeline";
  const title = lang === "ar" ? "كم تستغرق دراسة الطيران حتى الاحتراف؟" : "How Long Does It Take to Become a Professional Pilot?";
  const intro = lang === "ar"
    ? "الإجابة القصيرة: من 12 إلى 18 شهرًا في الغالب. لكن الإجابة الحقيقية تعتمد على عوامل يستحق كل طالب معرفتها قبل التخطيط لرحلته."
    : "The short answer: usually 12 to 18 months. But the real answer depends on factors every student should know before planning their journey.";
  const related = lang === "ar"
    ? [
        { title: "الفرق بين PPL و CPL", href: "/guides/ppl-vs-cpl" },
        { title: "كم تكلفة تعلم الطيران في جنوب أفريقيا؟", href: "/guides/flight-training-cost-south-africa" },
        { title: "دراسة الطيران في جنوب أفريقيا: الدليل الشامل", href: "/guides/study-aviation-in-south-africa" },
      ]
    : [
        { title: "PPL vs CPL", href: "/en/guides/ppl-vs-cpl" },
        { title: "How Much Does Flight Training Cost in South Africa?", href: "/en/guides/flight-training-cost-south-africa" },
        { title: "Studying Aviation in South Africa: The Complete Guide", href: "/en/guides/study-aviation-in-south-africa" },
      ];

  return (
    <GuideArticle path="/guides/how-long-to-become-a-pilot" lang={lang} kicker={kicker} title={title} intro={intro} faqItems={FAQ_ITEMS[lang]} related={related}>
      {lang === "ar" ? <ArabicContent /> : <EnglishContent />}
    </GuideArticle>
  );
}
