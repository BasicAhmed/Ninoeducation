import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

const META = {
  ar: { title: "متطلبات SACAA والفحص الطبي لرخصة الطيران | نينو إديوكيشن", description: "كل ما تحتاج معرفته عن هيئة الطيران المدني الجنوب أفريقية (SACAA) ومتطلبات الفحص الطبي قبل بدء التدريب على الطيران." },
  en: { title: "SACAA Requirements and the Aviation Medical Exam | Nino Education", description: "Everything you need to know about the South African Civil Aviation Authority (SACAA) and medical exam requirements before starting flight training." },
};

export async function generateMetadata() {
  const lang = await getLang();
  return { title: META[lang].title, description: META[lang].description, alternates: { canonical: `${SITE_URL}/guides/sacaa-medical-requirements` } };
}

const FAQ_ITEMS = {
  ar: [
    { q: "ما هي SACAA؟", a: "هيئة الطيران المدني الجنوب أفريقية (South African Civil Aviation Authority) هي الجهة الرسمية المسؤولة عن تنظيم واعتماد التدريب والرخص الجوية في جنوب أفريقيا، وهي معتمدة من منظمة الطيران المدني الدولي (ICAO) — ما يجعل رخصتها قابلة للتحويل عالميًا." },
    { q: "متى يجب أن أخضع للفحص الطبي؟", a: "يُفضل الخضوع للفحص الطبي قبل الالتزام النهائي بالتسجيل أو دفع أي رسوم كبيرة، وليس بعد الوصول لجنوب أفريقيا. هذا يحميك من دفع تكاليف على برنامج قد تُكتشف لاحقًا مشكلة طبية تمنعك من إكماله." },
    { q: "ما هي الفئة الطبية المطلوبة؟", a: "يحتاج طلاب PPL عادة إلى شهادة طبية من الفئة الثانية على الأقل، بينما يحتاج طلاب CPL إلى شهادة من الفئة الأولى — وهي فحص أكثر تفصيلًا. من الأفضل الحصول على شهادة الفئة الأولى من البداية إذا كان هدفك النهائي CPL، لتوفير الوقت والتكلفة." },
    { q: "هل ضعف النظر يمنعني من أن أصبح طيارًا؟", a: "ليس بالضرورة. النظارات أو العدسات اللاصقة مقبولة في كثير من الحالات طالما وصلت لمستوى الرؤية المطلوب بتصحيح. عمى الألوان الكامل قد يكون عائقًا حسب شدته، لكن هذا يُحدد فقط من خلال الفحص الفعلي مع طبيب طيران معتمد — لا تفترض الرفض بنفسك قبل الفحص." },
    { q: "من يقوم بالفحص الطبي؟", a: "يجب أن يكون الفحص من طبيب طيران معتمد رسميًا من SACAA (Aviation Medical Examiner). لا يُعتد بفحص من طبيب عام عادي — نينو إديوكيشن يمكن أن يرشدك لأطباء معتمدين في بلدك أو في جنوب أفريقيا." },
  ],
  en: [
    { q: "What is SACAA?", a: "The South African Civil Aviation Authority (SACAA) is the official body responsible for regulating and accrediting aviation training and licenses in South Africa, and it's accredited by the International Civil Aviation Organization (ICAO) — which makes its license globally convertible." },
    { q: "When should I take the medical exam?", a: "It's best to take the medical exam before finally committing to enrollment or paying any significant fees, not after arriving in South Africa. This protects you from paying costs toward a program only to later discover a medical issue that prevents you from completing it." },
    { q: "What medical class is required?", a: "PPL students typically need at least a Class 2 medical certificate, while CPL students need a Class 1 certificate — a more detailed exam. It's better to get the Class 1 certificate from the start if your ultimate goal is a CPL, to save time and cost." },
    { q: "Does poor eyesight prevent me from becoming a pilot?", a: "Not necessarily. Glasses or contact lenses are acceptable in many cases as long as you reach the required vision level with correction. Complete color blindness may be a barrier depending on severity, but this is only determined through an actual exam with a certified aviation doctor — don't assume rejection yourself before the exam." },
    { q: "Who performs the medical exam?", a: "The exam must be done by a doctor officially certified by SACAA as an Aviation Medical Examiner. An exam from a regular general practitioner doesn't count — Nino Education can direct you to certified doctors in your country or in South Africa." },
  ],
};

function ArabicContent() {
  return (
    <>
      <section id="what-is-sacaa">
        <h2 className="font-display text-2xl text-nino-ink">ما هي SACAA ولماذا تهمك؟</h2>
        <p className="mt-3">هيئة الطيران المدني الجنوب أفريقية (SACAA) هي الجهة التي تعتمد كل مدرسة طيران، وتضع معايير التدريب، وتصدر الرخص النهائية. اعتمادها من منظمة الطيران المدني الدولي (ICAO) هو ما يجعل رخصتك قابلة للتحويل إلى معظم دول العالم بعد التخرج، بدلًا من أن تكون رخصة محلية محدودة الاستخدام.</p>
        <p className="mt-3">
          عمليًا، هذا يعني أنه عند اختيار مدرسة، يجب التأكد أنها معتمدة رسميًا من SACAA — وهو أمر تحققنا منه مسبقًا لكل مدرسة{" "}<Link href="/schools" className="text-nino-orange hover:underline">مدرجة على منصتنا</Link>.
        </p>
      </section>

      <section id="medical-categories">
        <h2 className="font-display text-2xl text-nino-ink">فئات الشهادة الطبية</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>الفئة الأولى (Class 1):</strong> مطلوبة لرخصة الطيار التجاري (CPL) — فحص شامل يشمل النظر، السمع، القلب، وسلامة عامة.</li>
          <li><strong>الفئة الثانية (Class 2):</strong> مطلوبة لرخصة الطيار الخاص (PPL) فقط — أقل صرامة نسبيًا من الفئة الأولى.</li>
        </ul>
        <p className="mt-3">إذا كان هدفك النهائي CPL، ننصح بالخضوع لفحص الفئة الأولى من البداية مباشرة، بدلًا من البدء بالفئة الثانية ثم اكتشاف لاحقًا أنك بحاجة لإعادة الفحص بمعايير أعلى.</p>
      </section>

      <section id="common-concerns">
        <h2 className="font-display text-2xl text-nino-ink">مخاوف طبية شائعة</h2>
        <p className="mt-3">كثير من الطلاب يفترضون استبعادهم بسبب النظارات، حساسية بسيطة، أو حالة صحية مُدارة (مثل السكري المستقر)، بينما الواقع أن كثيرًا من هذه الحالات مقبولة أو قابلة للتقييم الفردي. القاعدة الذهبية: لا تفترض الرفض بنفسك — اخضع للفحص الفعلي مع طبيب طيران معتمد واحصل على إجابة واضحة قبل اتخاذ أي قرار مالي كبير.</p>
      </section>

      <section id="when-to-check">
        <h2 className="font-display text-2xl text-nino-ink">متى يجب أن تفحص نفسك؟</h2>
        <p className="mt-3">في أقرب وقت ممكن في رحلتك، وقبل الالتزام بدفع رسوم كبيرة لأي مدرسة. هذا يحميك ماليًا ونفسيًا، ويمنحك وقتًا كافيًا لمعالجة أي ملاحظة طبية بسيطة إن وُجدت قبل موعد سفرك.</p>
      </section>
    </>
  );
}

function EnglishContent() {
  return (
    <>
      <section id="what-is-sacaa">
        <h2 className="font-display text-2xl text-nino-ink">What Is SACAA and Why Does It Matter to You?</h2>
        <p className="mt-3">The South African Civil Aviation Authority (SACAA) is the body that accredits every flight school, sets training standards, and issues final licenses. Its accreditation by the International Civil Aviation Organization (ICAO) is what makes your license convertible in most countries in the world after graduation, instead of being a locally-limited license.</p>
        <p className="mt-3">
          Practically, this means that when choosing a school, you need to make sure it&apos;s officially SACAA-accredited — something we&apos;ve already verified for every school{" "}<Link href="/en/schools" className="text-nino-orange hover:underline">listed on our platform</Link>.
        </p>
      </section>

      <section id="medical-categories">
        <h2 className="font-display text-2xl text-nino-ink">Medical Certificate Classes</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>Class 1:</strong> Required for a Commercial Pilot License (CPL) — a comprehensive exam covering vision, hearing, heart, and general fitness.</li>
          <li><strong>Class 2:</strong> Required for a Private Pilot License (PPL) only — relatively less strict than Class 1.</li>
        </ul>
        <p className="mt-3">If your ultimate goal is a CPL, we recommend taking the Class 1 exam directly from the start, instead of starting with Class 2 and later discovering you need to redo the exam at higher standards.</p>
      </section>

      <section id="common-concerns">
        <h2 className="font-display text-2xl text-nino-ink">Common Medical Concerns</h2>
        <p className="mt-3">Many students assume they&apos;re disqualified because of glasses, a minor allergy, or a managed health condition (like stable diabetes), when in reality many of these cases are acceptable or subject to individual assessment. The golden rule: don&apos;t assume rejection yourself — take the actual exam with a certified aviation doctor and get a clear answer before making any major financial decision.</p>
      </section>

      <section id="when-to-check">
        <h2 className="font-display text-2xl text-nino-ink">When Should You Get Checked?</h2>
        <p className="mt-3">As early as possible in your journey, and before committing to paying significant fees to any school. This protects you financially and mentally, and gives you enough time to address any minor medical note, if any, before your travel date.</p>
      </section>
    </>
  );
}

export default async function SacaaMedicalGuidePage() {
  const lang: Lang = await getLang();
  const kicker = lang === "ar" ? "اللوائح والمتطلبات الطبية" : "Regulations and Medical Requirements";
  const title = lang === "ar" ? "متطلبات SACAA والفحص الطبي: ما يجب أن تعرفه قبل البدء" : "SACAA Requirements and the Medical Exam: What You Need to Know Before Starting";
  const intro = lang === "ar"
    ? "قبل أن تستثمر وقتك ومالك في التدريب، تأكد أنك تفهم من هي الجهة المنظمة، وهل تستوفي المتطلبات الطبية الأساسية لحمل رخصة طيران."
    : "Before you invest your time and money in training, make sure you understand who the regulator is, and whether you meet the basic medical requirements for holding a pilot license.";
  const related = lang === "ar"
    ? [
        { title: "الفرق بين PPL و CPL", href: "/guides/ppl-vs-cpl" },
        { title: "التأشيرة الدراسية لجنوب أفريقيا", href: "/guides/south-africa-study-visa" },
        { title: "كم تستغرق مدة دراسة الطيران؟", href: "/guides/how-long-to-become-a-pilot" },
      ]
    : [
        { title: "PPL vs CPL", href: "/en/guides/ppl-vs-cpl" },
        { title: "South Africa's Study Visa", href: "/en/guides/south-africa-study-visa" },
        { title: "How Long Does Aviation Training Take?", href: "/en/guides/how-long-to-become-a-pilot" },
      ];

  return (
    <GuideArticle path="/guides/sacaa-medical-requirements" lang={lang} kicker={kicker} title={title} intro={intro} faqItems={FAQ_ITEMS[lang]} related={related}>
      {lang === "ar" ? <ArabicContent /> : <EnglishContent />}
    </GuideArticle>
  );
}
