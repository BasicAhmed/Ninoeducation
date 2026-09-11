import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

const META = {
  ar: { title: "نصائح عملية للنجاح في دراسة الطيران بجنوب أفريقيا | نينو إديوكيشن", description: "نصائح واقعية من تجارب طلاب سابقين: كيف تتأقلم بسرعة، تدير ميزانيتك، وتحافظ على تقدمك في التدريب دون تعثر." },
  en: { title: "Practical Tips to Succeed at Aviation Training in South Africa | Nino Education", description: "Realistic tips from past students' experiences: how to adapt quickly, manage your budget, and keep your training progressing without stumbling." },
};

export async function generateMetadata() {
  const lang = await getLang();
  return { title: META[lang].title, description: META[lang].description, alternates: { canonical: `${SITE_URL}/guides/tips-to-succeed-in-south-africa` } };
}

const FAQ_ITEMS = {
  ar: [
    { q: "هل أحتاج سيارة في جنوب أفريقيا؟", a: "ليس بالضرورة إذا كان سكنك قريبًا من المدرسة، لكن امتلاك وسيلة تنقل (سيارة مستعملة رخيصة أو ترتيب مشترك مع زملاء) يسهل حياتك كثيرًا للتسوق والمشاوير خارج الروتين اليومي." },
    { q: "كيف أدير أموالي بذكاء أثناء البرنامج؟", a: "افتح حسابًا بنكيًا محليًا فور وصولك لتفادي رسوم التحويل المتكررة، وخصص ميزانية شهرية واضحة للمعيشة منفصلة عن رسوم التدريب، مع هامش احتياطي للطوارئ." },
    { q: "هل أحتاج شريحة اتصال محلية؟", a: "نعم، فور وصولك تقريبًا. تسهّل التواصل اليومي مع المدرسة والسكن، وأرخص بكثير من التجوال الدولي على شريحتك الأصلية." },
    { q: "كيف أحافظ على تقدمي في التدريب دون تعثر؟", a: "راجع موادك النظرية بانتظام بدل التكديس قبل الاختبارات، واسأل مدربك عن أي نقطة غير واضحة فورًا بدل تأجيلها. التقدم المنتظم البطيء أفضل من محاولة التسريع المفاجئ." },
    { q: "هل يستحق الأمر التواصل مع خريجين سابقين؟", a: "بالتأكيد. خريجو المدرسة أو طلاب في مراحل متقدمة يعطونك صورة واقعية لا تجدها في أي إعلان تسويقي — عن الجدولة الفعلية، المدربين، وحتى أفضل أماكن السكن والطعام القريبة." },
  ],
  en: [
    { q: "Do I need a car in South Africa?", a: "Not necessarily if your housing is close to the school, but having transportation (a cheap used car or a shared arrangement with peers) makes life much easier for shopping and errands outside the daily routine." },
    { q: "How do I manage my money smartly during the program?", a: "Open a local bank account as soon as you arrive to avoid repeated transfer fees, and set aside a clear monthly living budget separate from training fees, with a buffer margin for emergencies." },
    { q: "Do I need a local SIM card?", a: "Yes, pretty much as soon as you arrive. It makes daily communication with the school and housing easier, and is much cheaper than international roaming on your original SIM." },
    { q: "How do I keep my training progressing without stumbling?", a: "Review your theory materials regularly instead of cramming before exams, and ask your instructor about any unclear point immediately instead of postponing it. Steady, slow progress is better than trying to suddenly speed up." },
    { q: "Is it worth connecting with past graduates?", a: "Absolutely. School graduates or students at more advanced stages give you a realistic picture you won't find in any marketing ad — about actual scheduling, instructors, and even the best nearby housing and food spots." },
  ],
};

function ArabicContent() {
  return (
    <>
      <section id="before-arrival">
        <h2 className="font-display text-2xl text-nino-ink">قبل الوصول</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>أكمل إجراءات التأشيرة مبكرًا — راجع{" "}<Link href="/guides/south-africa-study-visa" className="text-nino-orange hover:underline">دليل التأشيرة</Link>.</li>
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
          <li>خصص ميزانية شهرية واضحة، وتابعها — راجع{" "}<Link href="/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">دليل التكلفة</Link>{" "}لتخطيط أدق.</li>
          <li>توقع تأخيرًا طبيعيًا في الجدول الزمني، ولا تعتبره فشلاً شخصيًا.</li>
        </ul>
      </section>

      <section id="mindset">
        <h2 className="font-display text-2xl text-nino-ink">العقلية الصحيحة</h2>
        <p className="mt-3">
          التدريب على الطيران رحلة طويلة نسبيًا، لا حدث واحدًا. الطلاب الذين ينجحون هم غالبًا من يتعاملون معه كعملية يومية تراكمية، ويطلبون الدعم عند الحاجة بدل مواجهة كل تحدٍ بمفردهم.{" "}
          <Link href="/apply" className="text-nino-orange hover:underline">ابدأ رحلتك اليوم</Link>{" "}ونحن معك في كل خطوة.
        </p>
      </section>
    </>
  );
}

function EnglishContent() {
  return (
    <>
      <section id="before-arrival">
        <h2 className="font-display text-2xl text-nino-ink">Before You Arrive</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>Complete visa procedures early — see the{" "}<Link href="/en/guides/south-africa-study-visa" className="text-nino-orange hover:underline">visa guide</Link>.</li>
          <li>Confirm your housing booking with enough time before travel, not after arriving.</li>
          <li>Bring digital and paper copies of all your official documents (passport, acceptance letter, medical certificates).</li>
          <li>Connect with current students at the same school if possible — even one WhatsApp group makes a big difference.</li>
        </ul>
      </section>

      <section id="first-weeks">
        <h2 className="font-display text-2xl text-nino-ink">Your First Weeks</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>Open a local bank account and get a SIM card as soon as you arrive.</li>
          <li>Get to know your surroundings: the nearest supermarket, pharmacy, and transport stop.</li>
          <li>Don&apos;t isolate yourself — join any local student community, Arab or international.</li>
        </ul>
      </section>

      <section id="during-training">
        <h2 className="font-display text-2xl text-nino-ink">During Training</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>Review theory materials regularly, don&apos;t postpone them to the last moment before an exam.</li>
          <li>Ask your instructor as soon as any confusion appears, instead of stacking up questions.</li>
          <li>Set a clear monthly budget, and track it — see the{" "}<Link href="/en/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">cost guide</Link>{" "}for more accurate planning.</li>
          <li>Expect natural delays in the timeline, and don&apos;t consider it personal failure.</li>
        </ul>
      </section>

      <section id="mindset">
        <h2 className="font-display text-2xl text-nino-ink">The Right Mindset</h2>
        <p className="mt-3">
          Flight training is a relatively long journey, not a single event. Students who succeed are usually those who treat it as a cumulative daily process, and ask for support when needed instead of facing every challenge alone.{" "}
          <Link href="/en/apply" className="text-nino-orange hover:underline">Start your journey today</Link>{" "}and we&apos;re with you every step.
        </p>
      </section>
    </>
  );
}

export default async function TipsGuidePage() {
  const lang: Lang = await getLang();
  const kicker = lang === "ar" ? "نصائح عملية" : "Practical Tips";
  const title = lang === "ar" ? "كيف تنجح في دراسة الطيران بجنوب أفريقيا؟" : "How to Succeed at Aviation Training in South Africa";
  const intro = lang === "ar"
    ? "نصائح واقعية مبنية على تجارب طلاب سبقوك — ليست نظرية، بل أشياء عملية تفرق فعليًا بين رحلة سلسة وأخرى مليئة بالعثرات."
    : "Realistic tips built on the experiences of students before you — not theory, but practical things that actually make the difference between a smooth journey and one full of stumbles.";
  const related = lang === "ar"
    ? [
        { title: "مشاكل قد تواجهك أثناء البرنامج", href: "/guides/common-challenges-flight-training" },
        { title: "السكن الطلابي في جنوب أفريقيا", href: "/guides/student-accommodation-south-africa" },
        { title: "دراسة الطيران في جنوب أفريقيا: الدليل الشامل", href: "/guides/study-aviation-in-south-africa" },
      ]
    : [
        { title: "Challenges You Might Face During Your Program", href: "/en/guides/common-challenges-flight-training" },
        { title: "Student Housing in South Africa", href: "/en/guides/student-accommodation-south-africa" },
        { title: "Studying Aviation in South Africa: The Complete Guide", href: "/en/guides/study-aviation-in-south-africa" },
      ];

  return (
    <GuideArticle path="/guides/tips-to-succeed-in-south-africa" lang={lang} kicker={kicker} title={title} intro={intro} faqItems={FAQ_ITEMS[lang]} related={related}>
      {lang === "ar" ? <ArabicContent /> : <EnglishContent />}
    </GuideArticle>
  );
}
