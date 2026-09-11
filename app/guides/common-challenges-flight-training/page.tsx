import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

const META = {
  ar: { title: "مشاكل شائعة يواجهها طلاب الطيران في جنوب أفريقيا | نينو إديوكيشن", description: "المشاكل الواقعية التي قد تواجهها أثناء برنامج التدريب — تأخير الطقس، الحنين للوطن، صعوبات مالية غير متوقعة — وكيف تتعامل معها." },
  en: { title: "Common Challenges Aviation Students Face in South Africa | Nino Education", description: "The real challenges you might face during your training program — weather delays, homesickness, unexpected financial difficulties — and how to handle them." },
};

export async function generateMetadata() {
  const lang = await getLang();
  return { title: META[lang].title, description: META[lang].description, alternates: { canonical: `${SITE_URL}/guides/common-challenges-flight-training` } };
}

const FAQ_ITEMS = {
  ar: [
    { q: "هل من الطبيعي أن أشعر بالحنين للوطن؟", a: "نعم، تمامًا. معظم الطلاب الدوليين يمرون بهذا خاصة في الشهر الأول أو الثاني. التواصل المنتظم مع العائلة، والانضمام لمجتمع الطلاب العرب المحليين، يخفف هذا الشعور بشكل كبير مع الوقت." },
    { q: "ماذا لو تأخرت في التدريب عن الجدول المتوقع؟", a: "هذا شائع جدًا وليس علامة فشل. الطقس، الصيانة، وسرعة التعلم الفردية كلها عوامل طبيعية. المهم هو التواصل الواضح مع المدرسة، ومتابعة وضع التأشيرة إذا احتجت تمديدها." },
    { q: "ماذا أفعل إذا شعرت أن التكلفة تتجاوز ما خططت له؟", a: "تواصل فورًا مع المدرسة لفهم السبب بدقة (ساعات إضافية؟ رسوم لم تكن واضحة؟)، ولا تنتظر حتى تتراكم المفاجآت. الشفافية المبكرة توفر عليك ضغطًا ماليًا لاحقًا." },
    { q: "هل من الطبيعي أن أشك في قراري في مرحلة ما؟", a: "نعم، الشك مرحلة طبيعية في أي رحلة صعبة وطويلة. الفرق بين من يكمل ومن يتوقف غالبًا هو وجود شبكة دعم حقيقية (زملاء، عائلة، جهة مثل نينو إديوكيشن) يمكن التحدث معها بدل مواجهة الشك بمفردك." },
    { q: "إلى من أتوجه إذا واجهت مشكلة حقيقية مع المدرسة؟", a: "إذا قدّمت عبر نينو إديوكيشن، تواصل معنا مباشرة — نحن نبقى نقطة اتصال بينك وبين المدرسة طوال فترة برنامجك، وليس فقط حتى لحظة القبول." },
  ],
  en: [
    { q: "Is it normal to feel homesick?", a: "Yes, completely. Most international students go through this, especially in the first or second month. Regular contact with family, and joining the local Arab student community, eases this feeling significantly over time." },
    { q: "What if I fall behind the expected training schedule?", a: "This is very common and not a sign of failure. Weather, maintenance, and individual learning pace are all natural factors. What matters is clear communication with the school, and tracking your visa status if you need to extend it." },
    { q: "What do I do if I feel costs are exceeding what I planned?", a: "Contact the school immediately to precisely understand why (extra hours? unclear fees?), and don't wait for surprises to pile up. Early transparency saves you financial pressure later." },
    { q: "Is it normal to doubt my decision at some point?", a: "Yes, doubt is a normal phase in any difficult, long journey. The difference between those who finish and those who stop is often having a real support network (peers, family, an entity like Nino Education) to talk to instead of facing doubt alone." },
    { q: "Who do I turn to if I face a real problem with the school?", a: "If you applied through Nino Education, contact us directly — we remain a point of contact between you and the school throughout your program, not just until the moment of acceptance." },
  ],
};

function ArabicContent() {
  return (
    <>
      <section id="weather-delays">
        <h2 className="font-display text-2xl text-nino-ink">تأخير الطقس والجدولة</h2>
        <p className="mt-3">رغم أن جنوب أفريقيا تتمتع بطقس مناسب للطيران معظم السنة، توجد فترات موسمية أقل ملاءمة. أضف لذلك احتمال ازدحام جدول الطائرات والمدربين في مدرسة نشطة. النتيجة الواقعية: توقع أن جدولك الزمني قد يمتد أسابيع أو حتى شهرًا أو أكثر عن الخطة الأصلية — وهذا طبيعي تمامًا، وليس استثناءً.</p>
      </section>

      <section id="homesickness">
        <h2 className="font-display text-2xl text-nino-ink">الحنين للوطن والعزلة الاجتماعية</h2>
        <p className="mt-3">الانتقال لبلد جديد بمفردك، غالبًا في مدينة صغيرة قريبة من المطار، يعني في البداية تحديًا اجتماعيًا حقيقيًا. الحل العملي: ابحث عن مجتمع الطلاب العرب أو الدوليين الموجودين مسبقًا في نفس المدرسة أو المنطقة — هذا يسرّع تأقلمك بشكل كبير.</p>
      </section>

      <section id="unexpected-costs">
        <h2 className="font-display text-2xl text-nino-ink">تكاليف غير متوقعة</h2>
        <p className="mt-3">
          كما ذكرنا في{" "}<Link href="/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">دليل التكلفة</Link>، ساعات الطيران الإضافية عن الحد الأدنى شائعة وتضيف تكلفة حقيقية. ننصح بشدة بتخصيص هامش احتياطي 10-15% فوق الميزانية المعلنة من المدرسة، بدلًا من التخطيط على الرقم الأدنى فقط.
        </p>
      </section>

      <section id="motivation">
        <h2 className="font-display text-2xl text-nino-ink">فقدان الحافز في منتصف الطريق</h2>
        <p className="mt-3">بعد الحماس الأولي، تأتي مرحلة روتينية طويلة من التدريب المتكرر. هذا طبيعي في أي مهارة تُبنى على مئات الساعات، وليس علامة على اختيار خاطئ. التذكير المستمر بهدفك النهائي، والتواصل مع طلاب في مراحل متقدمة، يساعد كثيرًا في تجاوز هذه المرحلة.</p>
      </section>

      <section id="not-alone">
        <h2 className="font-display text-2xl text-nino-ink">أنت لست وحدك في هذا</h2>
        <p className="mt-3">
          الهدف من نينو إديوكيشن ليس فقط مساعدتك على التقديم، بل البقاء نقطة اتصال موثوقة طوال رحلتك.{" "}<Link href="/apply" className="text-nino-orange hover:underline">ابدأ طلبك اليوم</Link>{" "}ودعنا نساعدك من الخطوة الأولى حتى التخرج.
        </p>
      </section>
    </>
  );
}

function EnglishContent() {
  return (
    <>
      <section id="weather-delays">
        <h2 className="font-display text-2xl text-nino-ink">Weather Delays and Scheduling</h2>
        <p className="mt-3">Although South Africa enjoys weather suitable for flying most of the year, there are less-suitable seasonal periods. Add to that the possibility of a busy aircraft and instructor schedule at an active school. The realistic result: expect your timeline may extend weeks or even a month or more beyond the original plan — this is completely normal, not an exception.</p>
      </section>

      <section id="homesickness">
        <h2 className="font-display text-2xl text-nino-ink">Homesickness and Social Isolation</h2>
        <p className="mt-3">Moving to a new country alone, often in a small city near the airport, initially means a real social challenge. The practical solution: look for the Arab or international student community already present at the same school or area — this significantly speeds up your adjustment.</p>
      </section>

      <section id="unexpected-costs">
        <h2 className="font-display text-2xl text-nino-ink">Unexpected Costs</h2>
        <p className="mt-3">
          As mentioned in the{" "}<Link href="/en/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">cost guide</Link>, flight hours beyond the minimum are common and add real cost. We strongly recommend setting aside a 10-15% buffer margin above the budget advertised by the school, instead of planning on the minimum number alone.
        </p>
      </section>

      <section id="motivation">
        <h2 className="font-display text-2xl text-nino-ink">Losing Motivation Midway</h2>
        <p className="mt-3">After the initial excitement, a long, repetitive training routine sets in. This is normal in any skill built on hundreds of hours, not a sign of a wrong choice. Constantly reminding yourself of your ultimate goal, and connecting with students at more advanced stages, helps a lot in getting through this phase.</p>
      </section>

      <section id="not-alone">
        <h2 className="font-display text-2xl text-nino-ink">You&apos;re Not Alone in This</h2>
        <p className="mt-3">
          Nino Education&apos;s goal isn&apos;t just helping you apply, it&apos;s remaining a trusted point of contact throughout your journey.{" "}<Link href="/en/apply" className="text-nino-orange hover:underline">Start your application today</Link>{" "}and let us help you from the first step through graduation.
        </p>
      </section>
    </>
  );
}

export default async function ChallengesGuidePage() {
  const lang: Lang = await getLang();
  const kicker = lang === "ar" ? "بصراحة تامة" : "In Complete Honesty";
  const title = lang === "ar" ? "مشاكل قد تواجهك أثناء برنامج التدريب" : "Challenges You Might Face During Your Training Program";
  const intro = lang === "ar"
    ? "لن تقرأ هذا في أي إعلان تسويقي، لكنه أهم ما تحتاج معرفته. المشاكل الواقعية التي يمر بها الطلاب — وكيف تتعامل معها قبل أن تفاجئك."
    : "You won't read this in any marketing ad, but it's the most important thing you need to know. The real challenges students go through — and how to handle them before they surprise you.";
  const related = lang === "ar"
    ? [
        { title: "نصائح للنجاح في جنوب أفريقيا", href: "/guides/tips-to-succeed-in-south-africa" },
        { title: "كم تستغرق دراسة الطيران حتى الاحتراف؟", href: "/guides/how-long-to-become-a-pilot" },
        { title: "كم تكلفة تعلم الطيران في جنوب أفريقيا؟", href: "/guides/flight-training-cost-south-africa" },
      ]
    : [
        { title: "Tips to Succeed in South Africa", href: "/en/guides/tips-to-succeed-in-south-africa" },
        { title: "How Long Does It Take to Become a Professional Pilot?", href: "/en/guides/how-long-to-become-a-pilot" },
        { title: "How Much Does Flight Training Cost in South Africa?", href: "/en/guides/flight-training-cost-south-africa" },
      ];

  return (
    <GuideArticle path="/guides/common-challenges-flight-training" lang={lang} kicker={kicker} title={title} intro={intro} faqItems={FAQ_ITEMS[lang]} related={related}>
      {lang === "ar" ? <ArabicContent /> : <EnglishContent />}
    </GuideArticle>
  );
}
