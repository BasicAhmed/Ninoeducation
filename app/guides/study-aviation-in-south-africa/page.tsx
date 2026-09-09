import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/constants";
import { GUIDES } from "@/lib/guides";

export const metadata = {
  title: "دراسة الطيران في جنوب أفريقيا: الدليل الشامل 2026 | نينو إديوكيشن",
  description:
    "كل ما يحتاج الطالب العربي معرفته عن دراسة الطيران في جنوب أفريقيا: التكلفة، أنواع الرخص، مدة التدريب، التأشيرة، السكن، وأفضل المدارس المعتمدة.",
  alternates: { canonical: `${SITE_URL}/guides/study-aviation-in-south-africa` },
};

const FAQ_ITEMS = [
  {
    q: "هل جنوب أفريقيا خيار جيد لدراسة الطيران؟",
    a: "نعم — جنوب أفريقيا من أكثر الوجهات شعبية بين الطلاب العرب والهنود لتدريب الطيران، بسبب اعتماد SACAA الدولي، الطقس المناسب للتدريب طوال السنة، والتكلفة الأقل بكثير مقارنة بأمريكا أو أوروبا أو حتى بعض الدول العربية.",
  },
  {
    q: "كم تبلغ تكلفة الحصول على رخصة طيار تجاري (CPL) في جنوب أفريقيا؟",
    a: "تتراوح التكلفة الإجمالية لبرنامج متكامل من الصفر حتى رخصة CPL عادة بين 40,000 إلى 100,000 دولار تقريبًا، حسب المدرسة والمسار (متكامل أو معياري) وعدد ساعات الطيران المطلوبة. استخدم حاسبة التكلفة لتقدير أدق حسب وضعك.",
  },
  {
    q: "هل رخصة SACAA معترف بها دوليًا؟",
    a: "نعم، هيئة الطيران المدني الجنوب أفريقية (SACAA) معتمدة من منظمة الطيران المدني الدولي (ICAO)، ما يعني أن رخصتك قابلة للتحويل إلى معظم دول العالم، بما فيها دول الخليج، بعد استيفاء متطلبات التحويل المحلية.",
  },
  {
    q: "هل يحتاج الطالب الدولي تأشيرة دراسية؟",
    a: "نعم، يحتاج الطلاب غير الجنوب أفريقيين إلى تأشيرة دراسة (Study Visa) قبل بدء التدريب. المستندات الأساسية تشمل خطاب قبول من المدرسة، إثبات القدرة المالية، وجواز سفر ساري لمدة كافية. نينو إديوكيشن يرشدك خطوة بخطوة في هذه العملية بعد قبولك.",
  },
  {
    q: "كم تستغرق دراسة الطيران من الصفر حتى الاحتراف؟",
    a: "يعتمد ذلك على المسار والرخصة المستهدفة، لكن البرنامج المتكامل من الصفر حتى رخصة CPL يستغرق عادة بين 12 و18 شهرًا، بينما تحتاج بعض المسارات المعيارية أو أهداف ATPL وقتًا إضافيًا لتجميع ساعات الطيران.",
  },
];

export default function StudyAviationGuidePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "دراسة الطيران في جنوب أفريقيا: الدليل الشامل",
    description:
      "دليل شامل حول تكلفة ومتطلبات ومدة دراسة الطيران في جنوب أفريقيا للطلاب الدوليين.",
    author: { "@type": "Organization", name: "نينو إديوكيشن" },
    publisher: { "@type": "Organization", name: "نينو إديوكيشن" },
    mainEntityOfPage: `${SITE_URL}/guides/study-aviation-in-south-africa`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SiteHeader />
      <main className="flex-1 bg-nino-white">
        <article className="mx-auto max-w-3xl px-6 pb-10 pt-28">
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
            الدليل الشامل · محدّث لعام 2026
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
            دراسة الطيران في جنوب أفريقيا: كل ما تحتاج معرفته
          </h1>
          <p className="mt-4 text-lg text-nino-ink/70">
            إذا كنت تفكر جديًا في أن تصبح طيارًا، فجنوب أفريقيا واحدة من أكثر الوجهات
            التي يقصدها الطلاب العرب والهنود سنويًا. هذا الدليل يجمع كل الأسئلة
            العملية التي يسألها كل طالب قبل اتخاذ القرار — بدون مبالغة تسويقية.
          </p>

          <div className="mt-10 space-y-14 leading-relaxed text-nino-ink/80">
            <section id="why">
              <h2 className="font-display text-2xl text-nino-ink">لماذا جنوب أفريقيا تحديدًا؟</h2>
              <p className="mt-3">
                أربعة أسباب عملية تجعل جنوب أفريقيا خيارًا متكررًا بين الطلاب الدوليين:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>
                  <strong>اعتماد دولي حقيقي:</strong> هيئة الطيران المدني الجنوب
                  أفريقية (SACAA) معتمدة من منظمة الطيران المدني الدولي (ICAO)،
                  فرخصتك ليست محلية الاستخدام فقط.
                </li>
                <li>
                  <strong>طقس يسمح بالتدريب طوال السنة:</strong> أكثر من 300 يوم
                  مشمس سنويًا في معظم مناطق التدريب، ما يعني تدريبًا أسرع وساعات
                  طيران فعلية أكثر بدلًا من انتظار الطقس المناسب لأشهر.
                </li>
                <li>
                  <strong>تكلفة أقل بكثير:</strong> تدريب بجودة عالمية بجزء من
                  تكلفة الولايات المتحدة أو أوروبا، وأحيانًا أقل من بعض الدول
                  العربية نفسها.
                </li>
                <li>
                  <strong>بيئة إنجليزية جاهزة:</strong> التدريب والاختبارات
                  بالكامل بالإنجليزية، دون الحاجة لتعلم لغة جديدة أولًا.
                </li>
              </ul>
            </section>

            <section id="cost">
              <h2 className="font-display text-2xl text-nino-ink">كم تكلفة دراسة الطيران في جنوب أفريقيا؟</h2>
              <p className="mt-3">
                التكلفة تختلف حسب الرخصة المستهدفة والمدرسة ونوع المسار (متكامل
                أو معياري)، لكن كمرجع تقريبي لبرنامج متكامل من الصفر حتى رخصة
                طيار تجاري (CPL):
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>رخصة طيار خاص (PPL) فقط: عادة تبدأ من حوالي 15,000–25,000 دولار.</li>
                <li>مسار متكامل حتى رخصة طيار تجاري (CPL): غالبًا بين 40,000–100,000 دولار.</li>
                <li>إضافات شائعة: تصنيف آلي (IR)، متعدد المحركات (ME)، ونظري ATPL — كل منها يضيف تكلفة منفصلة.</li>
              </ul>
              <p className="mt-3">
                هذه أرقام تقريبية فقط — الأسعار الفعلية تختلف بين المدارس وتتغير
                دوريًا. للحصول على تقدير أدق حسب ميزانيتك وأهدافك، استخدم{" "}
                <Link href="/calculator" className="text-nino-orange hover:underline">
                  حاسبة التكلفة
                </Link>{" "}
                أو{" "}
                <Link href="/schools" className="text-nino-orange hover:underline">
                  قارن أسعار المدارس مباشرة
                </Link>
                . للتفاصيل الكاملة، راجع{" "}
                <Link href="/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">
                  دليل التكلفة الشامل
                </Link>
                .
              </p>
            </section>

            <section id="licenses">
              <h2 className="font-display text-2xl text-nino-ink">أنواع رخص الطيران: من أين تبدأ؟</h2>
              <p className="mt-3">
                معظم الطلاب يمرون بنفس التسلسل التقريبي، وإن كان بعضهم يقفز مباشرة
                لمسار متكامل يجمع أكثر من رخصة معًا:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2">
                <li>
                  <strong>PPL (رخصة طيار خاص):</strong> نقطة البداية للجميع —
                  تسمح لك بالطيران لأغراض شخصية غير تجارية.
                </li>
                <li>
                  <strong>IR (تصنيف آلي):</strong> يؤهلك للطيران بالاعتماد على
                  الأجهزة في ظروف رؤية محدودة.
                </li>
                <li>
                  <strong>ME (متعدد المحركات):</strong> تأهيل على طائرات
                  بمحركين، مطلوب لمعظم وظائف شركات الطيران.
                </li>
                <li>
                  <strong>CPL (رخصة طيار تجاري):</strong> الرخصة التي تؤهلك
                  فعليًا للعمل كطيار محترف ومتلقي أجر.
                </li>
                <li>
                  <strong>ATPL Theory (نظري رخصة النقل الجوي):</strong> أعلى
                  مستوى نظري، خطوة أساسية نحو العمل في شركات الطيران الكبرى.
                </li>
              </ul>
              <p className="mt-3">
                يمكنك تصفح{" "}
                <Link href="/schools" className="text-nino-orange hover:underline">
                  المدارس المعتمدة حسب الرخصة التي تستهدفها
                </Link>{" "}
                لمعرفة أيها يقدم المسار الذي يناسبك، أو اقرأ{" "}
                <Link href="/guides/ppl-vs-cpl" className="text-nino-orange hover:underline">
                  مقارنة تفصيلية بين PPL وCPL
                </Link>
                .
              </p>
            </section>

            <section id="duration">
              <h2 className="font-display text-2xl text-nino-ink">كم تستغرق مدة التدريب؟</h2>
              <p className="mt-3">
                البرنامج المتكامل من الصفر حتى رخصة CPL يستغرق عادة بين 12 و18
                شهرًا، بافتراض تدريب متواصل بدون انقطاعات كبيرة. المسارات
                المعيارية (خطوة بخطوة، رخصة بعد رخصة) قد تأخذ وقتًا أطول لأنها
                تعتمد على تجميع ساعات الطيران تدريجيًا، أحيانًا بين رحلات
                متباعدة. راجع{" "}
                <Link href="/guides/how-long-to-become-a-pilot" className="text-nino-orange hover:underline">
                  الجدول الزمني التفصيلي
                </Link>{" "}
                لمعرفة ما يؤثر فعليًا على المدة.
              </p>
            </section>

            <section id="requirements">
              <h2 className="font-display text-2xl text-nino-ink">متطلبات القبول والتأشيرة الطلابية</h2>
              <p className="mt-3">
                المتطلبات الأساسية تختلف قليلًا بين المدارس، لكنها غالبًا تشمل:
                جواز سفر ساري المفعول، شهادة ثانوية عامة، مستوى إنجليزي مقبول
                (لا يشترط أن يكون ممتازًا من البداية)، وشهادة طبية أولية من طبيب
                طيران معتمد — راجع{" "}
                <Link href="/guides/sacaa-medical-requirements" className="text-nino-orange hover:underline">
                  دليل المتطلبات الطبية
                </Link>{" "}
                للتفاصيل.
              </p>
              <p className="mt-3">
                بعد قبولك، ستحتاج تأشيرة دراسة (Study Visa) للدخول القانوني
                والتدريب في جنوب أفريقيا. المستندات الأساسية عادة تشمل خطاب قبول
                من المدرسة، إثبات قدرة مالية على تغطية التكاليف، وجواز سفر ساري
                لمدة كافية. راجع{" "}
                <Link href="/guides/south-africa-study-visa" className="text-nino-orange hover:underline">
                  دليل التأشيرة الكامل خطوة بخطوة
                </Link>{" "}
                — نينو إديوكيشن يرشدك في هذه العملية بعد قبولك في المدرسة
                المناسبة.
              </p>
            </section>

            <section id="accommodation">
              <h2 className="font-display text-2xl text-nino-ink">السكن وتكلفة المعيشة</h2>
              <p className="mt-3">
                تختلف تكلفة المعيشة حسب المدينة ونمط السكن (غرفة خاصة، غرفة
                مشتركة، أو استوديو)، لكنها بشكل عام أقل بكثير من تكلفة المعيشة
                في أوروبا أو أمريكا الشمالية. ننسق خيارات سكن قريبة من المدرسة
                قبل وصولك، حتى لا تصل ولا تعرف أين ستقيم.
              </p>
              <p className="mt-3">
                يمكنك{" "}
                <Link href="/accommodation" className="text-nino-orange hover:underline">
                  تصفح خيارات السكن المتاحة
                </Link>{" "}
                بالقرب من كل مدرسة، مع الأسعار التقديرية الشهرية. للتفاصيل
                الكاملة، راجع{" "}
                <Link href="/guides/student-accommodation-south-africa" className="text-nino-orange hover:underline">
                  دليل السكن الشامل
                </Link>
                .
              </p>
            </section>

            <section id="apply">
              <h2 className="font-display text-2xl text-nino-ink">كيف تبدأ فعليًا؟</h2>
              <p className="mt-3">
                الخطوات عادة تسير بهذا الترتيب: مقارنة المدارس حسب ميزانيتك
                وأهدافك، تقديم طلب واحد عبر نينو إديوكيشن (بدون أي رسوم عليك)،
                استلام خطاب قبول أولي من المدرسة المناسبة، ثم البدء بترتيب
                التأشيرة والسكن والسفر بمساعدتنا.
              </p>
              <p className="mt-3">
                إذا كنت غير متأكد من أي رخصة أو مدرسة تناسبك، جرّب{" "}
                <Link href="/quiz" className="text-nino-orange hover:underline">
                  أداة البحث عن مدرستك المناسبة
                </Link>{" "}
                — ثلاثة أسئلة فقط وتحصل على ترشيحات مباشرة، أو راجع{" "}
                <Link href="/guides/how-to-choose-a-flight-school" className="text-nino-orange hover:underline">
                  دليل اختيار المدرسة المناسبة
                </Link>
                .
              </p>
            </section>

            <section id="after">
              <h2 className="font-display text-2xl text-nino-ink">ماذا يحدث بعد التخرج؟</h2>
              <p className="mt-3">
                بعد الحصول على رخصتك، رخصة SACAA المعتمدة من ICAO قابلة للتحويل
                لمعظم دول العالم بعد استيفاء متطلبات التحويل المحلية. يفتح هذا
                المجال للتقديم على شركات طيران في الخليج ومصر وغيرها، أو العمل
                كمدرب طيران لتجميع ساعات إضافية قبل الانتقال لشركات الطيران
                الكبرى. راجع{" "}
                <Link href="/guides/pilot-salary-and-jobs" className="text-nino-orange hover:underline">
                  دليل فرص العمل والرواتب
                </Link>{" "}
                لنظرة واقعية على هذا المسار.
              </p>
            </section>
          </div>

          {/* FAQ */}
          <section className="mt-16 border-t border-nino-line pt-10">
            <h2 className="font-display text-2xl">أسئلة شائعة</h2>
            <div className="mt-6 divide-y divide-nino-line">
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-nino-ink marker:content-none">
                    {item.q}
                    <span className="shrink-0 text-xl font-light text-nino-orange transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-nino-ink/70">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related guides */}
          <section className="mt-12 border-t border-nino-line pt-10">
            <h2 className="font-display text-xl">أدلة ذات صلة</h2>
            <ul className="mt-4 space-y-2">
              {GUIDES.filter((g) => g.href !== "/guides/study-aviation-in-south-africa").map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="text-nino-orange hover:underline">
                    {g.title} ←
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Final CTA */}
          <div className="mt-16 rounded-2xl bg-nino-ink px-8 py-10 text-center text-white">
            <h2 className="font-display text-2xl">جاهز تبدأ ملفك؟</h2>
            <p className="mt-2 text-white/70">
              قدّم طلبك مجانًا اليوم، ونرشح لك أفضل المدارس المناسبة لميزانيتك وأهدافك.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/apply"
                className="rounded-full bg-nino-orange px-6 py-3 text-sm font-medium hover:bg-white hover:text-nino-ink"
              >
                قدّم الآن
              </Link>
              <Link
                href="/schools"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium hover:bg-white/10"
              >
                تصفح المدارس
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
