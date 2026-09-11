import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

const META = {
  ar: { title: "فرص العمل ورواتب الطيارين بعد التخرج | نينو إديوكيشن", description: "نظرة واقعية على فرص العمل بعد الحصول على رخصة CPL: أين تبدأ، كيف تتطور الرواتب مع الخبرة، وما يؤثر فعليًا على فرصك." },
  en: { title: "Pilot Jobs and Salaries After Graduation | Nino Education", description: "A realistic look at job opportunities after getting a CPL: where you start, how salaries develop with experience, and what actually affects your chances." },
};

export async function generateMetadata() {
  const lang = await getLang();
  return { title: META[lang].title, description: META[lang].description, alternates: { canonical: `${SITE_URL}/guides/pilot-salary-and-jobs` } };
}

const FAQ_ITEMS = {
  ar: [
    { q: "هل يمكنني العمل في شركة طيران كبرى فور التخرج؟", a: "نادرًا جدًا. معظم شركات الطيران الكبرى تطلب حدًا أدنى من ساعات الطيران أعلى بكثير من الحد الأدنى القانوني لـCPL. المسار الشائع هو العمل أولًا كمدرب طيران أو في وظائف طيران أصغر لتجميع الساعات." },
    { q: "كم راتب الطيار المبتدئ عادة؟", a: "يختلف الرقم بشكل كبير حسب الدولة، نوع الشركة، ونوع الطائرة، ولا يوجد رقم عالمي ثابت يمكن الوثوق به كحقيقة مطلقة. ننصح بالبحث عن أرقام محدثة لكل سوق تستهدفه تحديدًا (الخليج، مصر، جنوب أفريقيا نفسها) بدل الاعتماد على رقم عام." },
    { q: "هل سوق الخليج فعلاً يحتاج طيارين جدد باستمرار؟", a: "قطاع الطيران في الخليج شهد نموًا كبيرًا في العقد الأخير مع توسع شركات الطيران الإقليمية، لكن الطلب الفعلي يتغير مع الوقت والظروف الاقتصادية. تابع إعلانات التوظيف الفعلية من الشركات المستهدفة بدل الاعتماد على انطباع عام ثابت." },
    { q: "هل رخصة SACAA مقبولة لدى شركات الطيران في الخليج؟", a: "رخصة SACAA معتمدة من ICAO، لكن كثيرًا من الدول (بما فيها دول الخليج) تطلب إجراءات تحويل أو اعتماد محلي إضافي قبل قبول الرخصة الأجنبية رسميًا. تحقق من متطلبات هيئة الطيران المدني في بلدك المستهدف تحديدًا قبل التخرج." },
    { q: "ما هي الخيارات غير شركات الطيران الكبرى؟", a: "التدريب كمدرب طيران، الطيران الخاص لشركات أو أفراد، طيران الشحن، والطيران الزراعي أو الخدمي في بعض الأسواق — كلها مسارات واقعية لتجميع الخبرة والساعات قبل أو بدلًا من التوجه لشركات الطيران التجارية الكبرى." },
  ],
  en: [
    { q: "Can I work at a major airline right after graduating?", a: "Very rarely. Most major airlines require a minimum flight hour count much higher than the legal CPL minimum. The common path is working first as a flight instructor or in smaller aviation jobs to build up hours." },
    { q: "What does an entry-level pilot typically earn?", a: "The number varies enormously by country, company type, and aircraft type, and there's no fixed global number that can be trusted as an absolute fact. We recommend researching up-to-date figures for the specific market you're targeting (the Gulf, Egypt, South Africa itself) instead of relying on a generic number." },
    { q: "Does the Gulf market genuinely need new pilots continuously?", a: "The aviation sector in the Gulf saw significant growth in the last decade with regional airline expansion, but actual demand changes over time and with economic conditions. Follow actual hiring announcements from target companies instead of relying on a fixed general impression." },
    { q: "Is a SACAA license accepted by Gulf airlines?", a: "A SACAA license is ICAO-accredited, but many countries (including Gulf states) require conversion procedures or additional local accreditation before formally accepting a foreign license. Check the specific civil aviation authority requirements in your target country before graduating." },
    { q: "What are the options besides major airlines?", a: "Working as a flight instructor, private flying for companies or individuals, cargo flying, and agricultural or utility flying in some markets — all realistic paths to build experience and hours before or instead of heading to major commercial airlines." },
  ],
};

function ArabicContent() {
  return (
    <>
      <section id="honest-note">
        <h2 className="font-display text-2xl text-nino-ink">ملاحظة صريحة قبل أن نبدأ</h2>
        <p className="mt-3">أرقام الرواتب في مجال الطيران تختلف بشكل كبير جدًا حسب الدولة، الشركة، نوع الطائرة، ومستوى الخبرة — ولا توجد جهة يمكنها إعطاءك رقمًا ثابتًا موثوقًا بنسبة 100%. أي موقع يعطيك رقمًا دقيقًا وثابتًا كوعد مؤكد يستحق الشك فيه. هذا الدليل يعطيك إطارًا واقعيًا للتفكير، وليس أرقامًا نهائية.</p>
      </section>

      <section id="typical-path">
        <h2 className="font-display text-2xl text-nino-ink">المسار المهني النموذجي</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>مباشرة بعد CPL:</strong> غالبًا العمل كمدرب طيران لتجميع ساعات إضافية، أو وظائف طيران صغيرة محلية.</li>
          <li><strong>بعد تجميع خبرة (عادة 500-1500 ساعة حسب الشركة):</strong> التقديم على شركات طيران إقليمية أو صغيرة.</li>
          <li><strong>مع خبرة أكبر:</strong> فرص أوسع في شركات الطيران الكبرى، مع تدرج في نوع الطائرة والمنصب (طيار مساعد ثم قائد طائرة).</li>
        </ul>
      </section>

      <section id="what-affects-pay">
        <h2 className="font-display text-2xl text-nino-ink">ما الذي يؤثر فعليًا على الراتب؟</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>عدد ساعات الطيران المتراكمة:</strong> العامل الأكبر تأثيرًا في معظم الأسواق.</li>
          <li><strong>نوع الشركة والطائرة:</strong> شركات الطيران الكبرى وطائرات الجسم العريض عادة أعلى أجرًا من الطيران الإقليمي الصغير.</li>
          <li><strong>الدولة وسوق العمل المحلي:</strong> الطلب والعرض يختلفان بشكل كبير بين الأسواق ومع الوقت.</li>
          <li><strong>المنصب:</strong> طيار مساعد (First Officer) مقابل قائد طائرة (Captain) — فرق كبير في الأجر مرتبط بالخبرة والأقدمية.</li>
        </ul>
      </section>

      <section id="how-to-improve-chances">
        <h2 className="font-display text-2xl text-nino-ink">كيف تحسّن فرصك الفعلية؟</h2>
        <p className="mt-3">
          ركّز على ما تتحكم فيه فعليًا: اختر مدرسة معتمدة وموثوقة (راجع{" "}<Link href="/guides/how-to-choose-a-flight-school" className="text-nino-orange hover:underline">دليل اختيار المدرسة</Link>)، أكمل تصنيفات إضافية مطلوبة لسوق العمل (IR، ME)، وابدأ بتجميع ساعات حقيقية فور التخرج بدل الانتظار للفرصة &quot;المثالية&quot;. الاستمرارية في التراكم أهم من انتظار قفزة سريعة.
        </p>
      </section>

      <section id="start">
        <h2 className="font-display text-2xl text-nino-ink">أول خطوة نحو هذا المسار</h2>
        <p className="mt-3">
          كل هذا يبدأ باختيار مدرسة مناسبة والحصول على رخصتك الأولى.{" "}<Link href="/apply" className="text-nino-orange hover:underline">قدّم طلبك المجاني اليوم</Link>{" "}لتبدأ رحلتك نحو هذا المسار المهني.
        </p>
      </section>
    </>
  );
}

function EnglishContent() {
  return (
    <>
      <section id="honest-note">
        <h2 className="font-display text-2xl text-nino-ink">A Frank Note Before We Start</h2>
        <p className="mt-3">Aviation salary figures vary enormously by country, company, aircraft type, and experience level — no source can give you a 100% trustworthy fixed number. Any site that gives you a precise, fixed number as a guaranteed promise deserves suspicion. This guide gives you a realistic framework for thinking, not final figures.</p>
      </section>

      <section id="typical-path">
        <h2 className="font-display text-2xl text-nino-ink">The Typical Career Path</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>Right after the CPL:</strong> Usually working as a flight instructor to build additional hours, or small local aviation jobs.</li>
          <li><strong>After building experience (usually 500-1500 hours depending on the company):</strong> Applying to regional or smaller airlines.</li>
          <li><strong>With more experience:</strong> Broader opportunities at major airlines, with progression in aircraft type and position (First Officer, then Captain).</li>
        </ul>
      </section>

      <section id="what-affects-pay">
        <h2 className="font-display text-2xl text-nino-ink">What Actually Affects Salary?</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>Accumulated flight hours:</strong> The most influential factor in most markets.</li>
          <li><strong>Company and aircraft type:</strong> Major airlines and wide-body aircraft usually pay more than small regional flying.</li>
          <li><strong>Country and local job market:</strong> Supply and demand vary significantly between markets and over time.</li>
          <li><strong>Position:</strong> First Officer versus Captain — a large pay difference tied to experience and seniority.</li>
        </ul>
      </section>

      <section id="how-to-improve-chances">
        <h2 className="font-display text-2xl text-nino-ink">How Do You Actually Improve Your Chances?</h2>
        <p className="mt-3">
          Focus on what you actually control: choose an accredited, trustworthy school (see the{" "}<Link href="/en/guides/how-to-choose-a-flight-school" className="text-nino-orange hover:underline">school-choosing guide</Link>), complete additional ratings the job market requires (IR, ME), and start building real hours right after graduating instead of waiting for the &quot;perfect&quot; opportunity. Consistent accumulation matters more than waiting for a quick leap.
        </p>
      </section>

      <section id="start">
        <h2 className="font-display text-2xl text-nino-ink">The First Step Toward This Path</h2>
        <p className="mt-3">
          All of this starts with choosing the right school and getting your first license.{" "}<Link href="/en/apply" className="text-nino-orange hover:underline">Submit your free application today</Link>{" "}to start your journey toward this career path.
        </p>
      </section>
    </>
  );
}

export default async function JobsSalaryGuidePage() {
  const lang: Lang = await getLang();
  const kicker = lang === "ar" ? "بعد التخرج" : "After Graduation";
  const title = lang === "ar" ? "فرص العمل ورواتب الطيارين: نظرة واقعية" : "Pilot Jobs and Salaries: A Realistic Look";
  const intro = lang === "ar"
    ? "هذا القسم الأكثر عرضة للمبالغة التسويقية في أي موقع طيران. إليك نظرة واقعية بدون أرقام مضخّمة أو وعود لا يمكن ضمانها."
    : "This is the section most prone to marketing exaggeration on any aviation website. Here's a realistic look without inflated numbers or promises that can't be guaranteed.";
  const related = lang === "ar"
    ? [
        { title: "كم تستغرق دراسة الطيران حتى الاحتراف؟", href: "/guides/how-long-to-become-a-pilot" },
        { title: "الفرق بين PPL و CPL", href: "/guides/ppl-vs-cpl" },
        { title: "دراسة الطيران في جنوب أفريقيا: الدليل الشامل", href: "/guides/study-aviation-in-south-africa" },
      ]
    : [
        { title: "How Long Does It Take to Become a Professional Pilot?", href: "/en/guides/how-long-to-become-a-pilot" },
        { title: "PPL vs CPL", href: "/en/guides/ppl-vs-cpl" },
        { title: "Studying Aviation in South Africa: The Complete Guide", href: "/en/guides/study-aviation-in-south-africa" },
      ];

  return (
    <GuideArticle path="/guides/pilot-salary-and-jobs" lang={lang} kicker={kicker} title={title} intro={intro} faqItems={FAQ_ITEMS[lang]} related={related}>
      {lang === "ar" ? <ArabicContent /> : <EnglishContent />}
    </GuideArticle>
  );
}
