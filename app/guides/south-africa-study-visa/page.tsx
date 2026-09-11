import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

const META = {
  ar: { title: "التأشيرة الدراسية لجنوب أفريقيا: دليل الطلاب الدوليين 2026 | نينو إديوكيشن", description: "كل خطوة تحتاجها للحصول على تأشيرة الدراسة في جنوب أفريقيا كطالب طيران دولي: المستندات، المدة، التكلفة، والأخطاء الشائعة." },
  en: { title: "South Africa's Study Visa: International Students' 2026 Guide | Nino Education", description: "Every step you need to get a study visa for South Africa as an international aviation student: documents, timeline, cost, and common mistakes." },
};

export async function generateMetadata() {
  const lang = await getLang();
  return { title: META[lang].title, description: META[lang].description, alternates: { canonical: `${SITE_URL}/guides/south-africa-study-visa` } };
}

const FAQ_ITEMS = {
  ar: [
    { q: "متى يجب أن أتقدم بطلب التأشيرة؟", a: "بمجرد حصولك على خطاب القبول من المدرسة. تستغرق معالجة التأشيرة عادة من 4 إلى 8 أسابيع، لذا كلما تقدمت مبكرًا كان أفضل — لا تنتظر حتى قبل موعد الدفعة بأسابيع قليلة." },
    { q: "هل أحتاج لإثبات مالي؟ وكم المبلغ المطلوب؟", a: "نعم، تطلب السفارة إثباتًا على قدرتك على تغطية تكاليف الدراسة والمعيشة، عادة عبر كشف حساب بنكي أو خطاب رعاية مالية من ولي الأمر مع كشف حسابه. المبلغ الدقيق يعتمد على مدة برنامجك وتكلفته الإجمالية." },
    { q: "هل يمكن رفض طلب التأشيرة؟ ولماذا؟", a: "نعم، الأسباب الشائعة للرفض تشمل: مستندات مالية غير كافية أو غير واضحة، خطاب قبول غير مكتمل من المدرسة، جواز سفر قريب من الانتهاء، أو عدم تطابق المعلومات بين المستندات المختلفة. المتابعة الدقيقة للتفاصيل تقلل هذا الخطر كثيرًا." },
    { q: "هل تأشيرة الدراسة تسمح بالعمل في جنوب أفريقيا؟", a: "تأشيرة الدراسة الأساسية لا تسمح عادة بالعمل بأجر خارج نطاق التدريب. الهدف منها هو الدراسة والتدريب فقط، وليست بديلاً عن تأشيرة عمل." },
    { q: "ماذا يحدث إذا احتجت تمديد التأشيرة؟", a: "إذا امتد برنامجك التدريبي لأكثر من المدة الأصلية المصرح بها (بسبب تأخير في ساعات الطيران مثلاً)، يمكن تقديم طلب تمديد داخل جنوب أفريقيا قبل انتهاء صلاحية التأشيرة الحالية — من المهم عدم ترك هذا حتى اللحظة الأخيرة." },
  ],
  en: [
    { q: "When should I apply for the visa?", a: "As soon as you receive your acceptance letter from the school. Visa processing typically takes 4 to 8 weeks, so the earlier you apply, the better — don't wait until just a few weeks before your intake date." },
    { q: "Do I need proof of funds? And how much is required?", a: "Yes, the embassy requires proof of your ability to cover study and living costs, usually via a bank statement or a financial sponsorship letter from a guardian along with their statement. The exact amount depends on your program's duration and total cost." },
    { q: "Can a visa application be rejected? Why?", a: "Yes, common rejection reasons include: insufficient or unclear financial documents, an incomplete acceptance letter from the school, a passport nearing expiry, or mismatched information between different documents. Careful attention to detail greatly reduces this risk." },
    { q: "Does the study visa allow working in South Africa?", a: "A basic study visa typically doesn't allow paid work outside the scope of training. Its purpose is study and training only, and it isn't a substitute for a work visa." },
    { q: "What happens if I need to extend my visa?", a: "If your training program extends beyond the originally authorized period (due to a delay in flight hours, for example), an extension can be requested inside South Africa before your current visa expires — it's important not to leave this until the last moment." },
  ],
};

function ArabicContent() {
  return (
    <>
      <section id="who-needs-it">
        <h2 className="font-display text-2xl text-nino-ink">من يحتاج تأشيرة دراسة؟</h2>
        <p className="mt-3">أي طالب غير حامل للجنسية الجنوب أفريقية ينوي التدريب لأكثر من 90 يومًا يحتاج تأشيرة دراسة (Study Visa) رسمية قبل الوصول. لا يمكنك الدخول بتأشيرة سياحية والبدء بالتدريب — هذا مخالف للقانون وقد يعرضك للترحيل وإلغاء طلبك بالكامل.</p>
      </section>

      <section id="documents">
        <h2 className="font-display text-2xl text-nino-ink">المستندات المطلوبة</h2>
        <p className="mt-3">تختلف التفاصيل الدقيقة حسب سفارتك المحلية، لكن القائمة الأساسية تشمل عادة:</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>جواز سفر ساري المفعول لمدة لا تقل عن 30 يومًا بعد انتهاء برنامجك.</li>
          <li>خطاب قبول رسمي من مدرسة الطيران، موضح فيه البرنامج والمدة والتكلفة.</li>
          <li>إثبات القدرة المالية (كشف حساب بنكي، أو خطاب رعاية مالية من ولي الأمر).</li>
          <li>شهادة فحص طبي عام (غير الفحص الطبي الخاص بالطيران).</li>
          <li>شهادة عدم محكومية (Police Clearance Certificate) في كثير من الحالات.</li>
          <li>صور شخصية بالمواصفات المطلوبة، واستمارة طلب التأشيرة معبأة.</li>
        </ul>
        <p className="mt-3">
          راجع أيضًا{" "}<Link href="/guides/sacaa-medical-requirements" className="text-nino-orange hover:underline">دليل الفحص الطبي لرخصة الطيران</Link>{" "}— وهو فحص منفصل تمامًا عن الفحص الطبي العام المطلوب للتأشيرة.
        </p>
      </section>

      <section id="timeline">
        <h2 className="font-display text-2xl text-nino-ink">كم تستغرق المعالجة؟</h2>
        <p className="mt-3">عادة بين 4 إلى 8 أسابيع من تاريخ التقديم الكامل، لكن هذا يختلف حسب سفارتك المحلية وموسم التقديم. القاعدة الذهبية: قدّم فور استلام خطاب القبول، ولا تنتظر حتى تقترب موعد الدفعة. التقديم المتأخر هو السبب الأكثر شيوعًا لضياع موعد الالتحاق بالدفعة المستهدفة.</p>
      </section>

      <section id="mistakes">
        <h2 className="font-display text-2xl text-nino-ink">أخطاء شائعة تؤخر أو ترفض الطلب</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>عدم تطابق الاسم أو التاريخ بين المستندات المختلفة (جواز السفر، كشف الحساب، خطاب القبول).</li>
          <li>كشف حساب بنكي لا يغطي كامل تكلفة البرنامج والمعيشة بوضوح.</li>
          <li>التقديم بجواز سفر ستنتهي صلاحيته قريبًا.</li>
          <li>عدم ترجمة مستند رسمي مطلوب باللغة الإنجليزية عند الحاجة.</li>
          <li>الانتظار حتى قرب موعد الدفعة قبل بدء إجراءات التأشيرة.</li>
        </ul>
      </section>

      <section id="how-we-help">
        <h2 className="font-display text-2xl text-nino-ink">كيف يساعدك نينو إديوكيشن في هذا؟</h2>
        <p className="mt-3">بعد قبولك في مدرسة عبر نينو إديوكيشن، نرسل لك قائمة دقيقة بالمستندات المطلوبة حسب سفارتك، ونراجع معك ملفك قبل التقديم لتقليل احتمال الرفض أو التأخير. لا نقدّم الطلب نيابة عنك (القرار النهائي دائمًا بيد السفارة)، لكننا نبقى معك في كل خطوة حتى تحصل على تأشيرتك.</p>
        <p className="mt-3">
          إذا لم تكن قد قدّمت طلبك بعد،{" "}<Link href="/apply" className="text-nino-orange hover:underline">ابدأ طلبك المجاني هنا</Link>{" "}لنبدأ معك من الخطوة الأولى.
        </p>
      </section>
    </>
  );
}

function EnglishContent() {
  return (
    <>
      <section id="who-needs-it">
        <h2 className="font-display text-2xl text-nino-ink">Who Needs a Study Visa?</h2>
        <p className="mt-3">Any student who isn&apos;t a South African citizen intending to train for more than 90 days needs a formal study visa before arriving. You can&apos;t enter on a tourist visa and start training — this is illegal and could get you deported and your application fully cancelled.</p>
      </section>

      <section id="documents">
        <h2 className="font-display text-2xl text-nino-ink">Required Documents</h2>
        <p className="mt-3">Exact details vary by your local embassy, but the basic list usually includes:</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>A passport valid for at least 30 days beyond the end of your program.</li>
          <li>An official acceptance letter from the flight school, stating the program, duration, and cost.</li>
          <li>Proof of financial means (a bank statement, or a financial sponsorship letter from a guardian).</li>
          <li>A general medical exam certificate (not the aviation-specific medical exam).</li>
          <li>A police clearance certificate, in many cases.</li>
          <li>Personal photos meeting the required specifications, and a completed visa application form.</li>
        </ul>
        <p className="mt-3">
          Also see the{" "}<Link href="/en/guides/sacaa-medical-requirements" className="text-nino-orange hover:underline">aviation medical exam guide</Link>{" "}— a completely separate exam from the general medical exam required for the visa.
        </p>
      </section>

      <section id="timeline">
        <h2 className="font-display text-2xl text-nino-ink">How Long Does Processing Take?</h2>
        <p className="mt-3">Usually 4 to 8 weeks from the date of a complete application, but this varies by your local embassy and application season. The golden rule: apply as soon as you receive your acceptance letter, don&apos;t wait until close to your intake date. Late applications are the most common reason for missing a target intake.</p>
      </section>

      <section id="mistakes">
        <h2 className="font-display text-2xl text-nino-ink">Common Mistakes That Delay or Reject an Application</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>Name or date mismatches between different documents (passport, bank statement, acceptance letter).</li>
          <li>A bank statement that doesn&apos;t clearly cover the full program and living costs.</li>
          <li>Applying with a passport that will expire soon.</li>
          <li>Not translating a required official document into English when needed.</li>
          <li>Waiting until close to the intake date before starting visa procedures.</li>
        </ul>
      </section>

      <section id="how-we-help">
        <h2 className="font-display text-2xl text-nino-ink">How Does Nino Education Help With This?</h2>
        <p className="mt-3">After you&apos;re accepted at a school through Nino Education, we send you a precise checklist of documents required by your embassy, and review your file with you before submission to reduce the chance of rejection or delay. We don&apos;t submit the application on your behalf (the final decision always rests with the embassy), but we stay with you every step until you get your visa.</p>
        <p className="mt-3">
          If you haven&apos;t submitted your application yet,{" "}<Link href="/en/apply" className="text-nino-orange hover:underline">start your free application here</Link>{" "}and we&apos;ll begin with you from the first step.
        </p>
      </section>
    </>
  );
}

export default async function VisaGuidePage() {
  const lang: Lang = await getLang();
  const kicker = lang === "ar" ? "دليل التأشيرة · محدّث لعام 2026" : "Visa Guide · Updated for 2026";
  const title = lang === "ar" ? "التأشيرة الدراسية لجنوب أفريقيا: دليل خطوة بخطوة" : "South Africa's Study Visa: A Step-by-Step Guide";
  const intro = lang === "ar"
    ? "التأشيرة غالبًا أكثر جزء يقلق الطلاب الدوليين، رغم أنها في الواقع عملية واضحة إذا عرفت الترتيب الصحيح للخطوات. إليك كل ما تحتاج معرفته."
    : "The visa is often the part that worries international students most, even though it's actually a clear process if you know the right order of steps. Here's everything you need to know.";
  const related = lang === "ar"
    ? [
        { title: "دراسة الطيران في جنوب أفريقيا: الدليل الشامل", href: "/guides/study-aviation-in-south-africa" },
        { title: "كم تكلفة تعلم الطيران في جنوب أفريقيا؟", href: "/guides/flight-training-cost-south-africa" },
        { title: "متطلبات SACAA والفحص الطبي", href: "/guides/sacaa-medical-requirements" },
      ]
    : [
        { title: "Studying Aviation in South Africa: The Complete Guide", href: "/en/guides/study-aviation-in-south-africa" },
        { title: "How Much Does Flight Training Cost in South Africa?", href: "/en/guides/flight-training-cost-south-africa" },
        { title: "SACAA Requirements and the Medical Exam", href: "/en/guides/sacaa-medical-requirements" },
      ];

  return (
    <GuideArticle path="/guides/south-africa-study-visa" lang={lang} kicker={kicker} title={title} intro={intro} faqItems={FAQ_ITEMS[lang]} related={related}>
      {lang === "ar" ? <ArabicContent /> : <EnglishContent />}
    </GuideArticle>
  );
}
