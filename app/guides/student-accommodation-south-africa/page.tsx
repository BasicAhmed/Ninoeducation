import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

const META = {
  ar: { title: "السكن الطلابي في جنوب أفريقيا: دليل الطالب الدولي | نينو إديوكيشن", description: "كل ما تحتاج معرفته عن خيارات السكن لطلاب الطيران الدوليين في جنوب أفريقيا: الأنواع، الأسعار، القرب من المدرسة، وكيف تحجز قبل وصولك." },
  en: { title: "Student Housing in South Africa: The International Student's Guide | Nino Education", description: "Everything you need to know about housing options for international aviation students in South Africa: types, prices, proximity to school, and how to book before you arrive." },
};

export async function generateMetadata() {
  const lang = await getLang();
  return { title: META[lang].title, description: META[lang].description, alternates: { canonical: `${SITE_URL}/guides/student-accommodation-south-africa` } };
}

const FAQ_ITEMS = {
  ar: [
    { q: "هل يجب أن أحجز السكن قبل وصولي لجنوب أفريقيا؟", a: "نعم، بشدة. الوصول بدون سكن مرتب مسبقًا يعني إما دفع أسعار فندقية مرتفعة مؤقتًا أو مواجهة ضغط للقرار السريع في مكان جديد عليك. ننسق خيارات سكن مناسبة قبل سفرك بوقت كافٍ." },
    { q: "هل السكن قريب من المدرسة دائمًا؟", a: "معظم خيارات السكن التي نرشحها قريبة من المدرسة أو على مسافة قصيرة بالسيارة، لأن قرب المطار والمدرسة يوفر عليك وقتًا ومالًا يوميًا طوال مدة برنامجك." },
    { q: "هل يمكنني السكن مع طلاب آخرين من نفس بلدي؟", a: "في كثير من الحالات نعم، خاصة في المنازل المشتركة القريبة من مدارس تستقبل أعدادًا جيدة من الطلاب العرب. أخبرنا برغبتك عند التقديم وسنحاول مراعاتها ضمن الخيارات المتاحة." },
    { q: "هل السعر المعلن شهري ثابت؟", a: "غالبًا نعم، لكن بعض الخيارات تتطلب دفعة تأمين (Deposit) قابلة للاسترداد عند المغادرة بحالة سليمة. تأكد من فهم شروط العقد كاملة قبل الالتزام." },
    { q: "ماذا لو لم يعجبني السكن بعد الوصول؟", a: "نساعدك في إيجاد بديل مناسب إذا واجهت مشكلة حقيقية، لكن ننصح بشدة بمراجعة كل التفاصيل (الصور، المسافة، نوع الغرفة) بعناية قبل الحجز لتقليل هذا الاحتمال من الأساس." },
  ],
  en: [
    { q: "Should I book housing before arriving in South Africa?", a: "Yes, strongly. Arriving without housing arranged in advance means either paying temporarily high hotel prices or facing pressure to decide quickly in a place new to you. We coordinate suitable housing options well before your travel date." },
    { q: "Is housing always close to the school?", a: "Most housing options we recommend are close to the school or a short drive away, because proximity to the airport and school saves you time and money daily for the duration of your program." },
    { q: "Can I live with other students from my own country?", a: "In many cases, yes, especially in shared houses near schools that receive good numbers of Arab students. Tell us your preference when applying and we'll try to accommodate it within available options." },
    { q: "Is the advertised price a fixed monthly rate?", a: "Usually yes, but some options require a refundable deposit returned when you leave in good condition. Make sure you understand the full contract terms before committing." },
    { q: "What if I don't like the housing after arriving?", a: "We help you find a suitable alternative if you face a real problem, but we strongly recommend carefully reviewing all details (photos, distance, room type) before booking to reduce this possibility in the first place." },
  ],
};

function ArabicContent() {
  return (
    <>
      <section id="types">
        <h2 className="font-display text-2xl text-nino-ink">أنواع السكن المتاحة</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>غرفة خاصة في منزل مشترك:</strong> خصوصية أكبر، تكلفة أعلى قليلًا من الغرفة المشتركة.</li>
          <li><strong>غرفة مشتركة:</strong> الخيار الأكثر اقتصادية، وشائع بين الطلاب الجدد الذين يفضلون تقليل التكلفة والتعرف على زملاء بسرعة.</li>
          <li><strong>استوديو مستقل:</strong> أعلى تكلفة، لكن استقلالية كاملة — خيار مناسب لمن يفضل الهدوء التام.</li>
        </ul>
        <p className="mt-3">
          يمكنك{" "}<Link href="/accommodation" className="text-nino-orange hover:underline">تصفح خيارات السكن الفعلية والأسعار الشهرية</Link>{" "}المتاحة حاليًا بالقرب من كل مدرسة شريكة.
        </p>
      </section>

      <section id="cost">
        <h2 className="font-display text-2xl text-nino-ink">كم تكلف الإقامة شهريًا؟</h2>
        <p className="mt-3">
          تختلف الأسعار حسب المدينة ونوع الغرفة، لكنها بشكل عام معقولة جدًا مقارنة بوجهات التدريب الأخرى. لمعرفة كيف يدخل السكن ضمن ميزانيتك الإجمالية، راجع{" "}
          <Link href="/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">دليل التكلفة الشامل</Link>.
        </p>
      </section>

      <section id="how-to-choose">
        <h2 className="font-display text-2xl text-nino-ink">كيف تختار السكن المناسب؟</h2>
        <p className="mt-3">ثلاثة معايير عملية بترتيب الأهمية: المسافة الفعلية للمدرسة والمطار (تؤثر على وقتك اليومي طوال أشهر التدريب)، نوع الغرفة الذي يناسب ميزانيتك وشخصيتك (خاصة أم مشتركة)، ثم المرافق الإضافية (واي فاي، أثاث، مطبخ مشترك).</p>
      </section>

      <section id="booking">
        <h2 className="font-display text-2xl text-nino-ink">متى وكيف تحجز؟</h2>
        <p className="mt-3">
          بعد قبولك في المدرسة وبدء إجراءات التأشيرة، هذا هو التوقيت المثالي لتأكيد حجز السكن — قبل موعد سفرك بأسابيع كافية، وليس بعد وصولك.{" "}
          <Link href="/apply" className="text-nino-orange hover:underline">قدّم طلبك المجاني</Link>{" "}وسننسق معك خيار سكن مناسب ضمن هذا الجدول الزمني.
        </p>
      </section>
    </>
  );
}

function EnglishContent() {
  return (
    <>
      <section id="types">
        <h2 className="font-display text-2xl text-nino-ink">Available Housing Types</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>Private room in a shared house:</strong> More privacy, slightly higher cost than a shared room.</li>
          <li><strong>Shared room:</strong> The most economical option, common among new students who prefer reducing cost and meeting peers quickly.</li>
          <li><strong>Independent studio:</strong> Highest cost, but full independence — a good fit for those who prefer complete quiet.</li>
        </ul>
        <p className="mt-3">
          You can{" "}<Link href="/en/accommodation" className="text-nino-orange hover:underline">browse actual housing options and monthly prices</Link>{" "}currently available near each partner school.
        </p>
      </section>

      <section id="cost">
        <h2 className="font-display text-2xl text-nino-ink">How Much Does Housing Cost Monthly?</h2>
        <p className="mt-3">
          Prices vary by city and room type, but are generally very reasonable compared to other training destinations. To see how housing fits into your total budget, see the{" "}
          <Link href="/en/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">complete cost guide</Link>.
        </p>
      </section>

      <section id="how-to-choose">
        <h2 className="font-display text-2xl text-nino-ink">How Do You Choose the Right Housing?</h2>
        <p className="mt-3">Three practical criteria in order of importance: actual distance to the school and airport (affects your daily time for months of training), the room type that fits your budget and personality (private or shared), then additional amenities (Wi-Fi, furniture, shared kitchen).</p>
      </section>

      <section id="booking">
        <h2 className="font-display text-2xl text-nino-ink">When and How Do You Book?</h2>
        <p className="mt-3">
          After being accepted at a school and starting visa procedures, this is the ideal time to confirm your housing booking — enough weeks before your travel date, not after you arrive.{" "}
          <Link href="/en/apply" className="text-nino-orange hover:underline">Submit your free application</Link>{" "}and we&apos;ll coordinate a suitable housing option with you within this timeline.
        </p>
      </section>
    </>
  );
}

export default async function AccommodationGuidePage() {
  const lang: Lang = await getLang();
  const kicker = lang === "ar" ? "السكن الطلابي" : "Student Housing";
  const title = lang === "ar" ? "السكن في جنوب أفريقيا: دليل الطالب الدولي" : "Housing in South Africa: The International Student's Guide";
  const intro = lang === "ar"
    ? "بعد التأشيرة، السكن هو أكثر ما يقلق الطلاب الجدد. إليك كل الخيارات المتاحة، وكيف تحجز بثقة قبل حتى أن تحزم حقائبك."
    : "After the visa, housing is what worries new students most. Here are all the available options, and how to book with confidence before you even pack your bags.";
  const related = lang === "ar"
    ? [
        { title: "دراسة الطيران في جنوب أفريقيا: الدليل الشامل", href: "/guides/study-aviation-in-south-africa" },
        { title: "كم تكلفة تعلم الطيران في جنوب أفريقيا؟", href: "/guides/flight-training-cost-south-africa" },
        { title: "نصائح للنجاح في جنوب أفريقيا", href: "/guides/tips-to-succeed-in-south-africa" },
      ]
    : [
        { title: "Studying Aviation in South Africa: The Complete Guide", href: "/en/guides/study-aviation-in-south-africa" },
        { title: "How Much Does Flight Training Cost in South Africa?", href: "/en/guides/flight-training-cost-south-africa" },
        { title: "Tips to Succeed in South Africa", href: "/en/guides/tips-to-succeed-in-south-africa" },
      ];

  return (
    <GuideArticle path="/guides/student-accommodation-south-africa" lang={lang} kicker={kicker} title={title} intro={intro} faqItems={FAQ_ITEMS[lang]} related={related}>
      {lang === "ar" ? <ArabicContent /> : <EnglishContent />}
    </GuideArticle>
  );
}
