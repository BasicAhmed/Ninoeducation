import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "السكن الطلابي في جنوب أفريقيا: دليل الطالب الدولي | نينو إديوكيشن",
  description:
    "كل ما تحتاج معرفته عن خيارات السكن لطلاب الطيران الدوليين في جنوب أفريقيا: الأنواع، الأسعار، القرب من المدرسة، وكيف تحجز قبل وصولك.",
  alternates: { canonical: `${SITE_URL}/guides/student-accommodation-south-africa` },
};

const FAQ_ITEMS = [
  {
    q: "هل يجب أن أحجز السكن قبل وصولي لجنوب أفريقيا؟",
    a: "نعم، بشدة. الوصول بدون سكن مرتب مسبقًا يعني إما دفع أسعار فندقية مرتفعة مؤقتًا أو مواجهة ضغط للقرار السريع في مكان جديد عليك. ننسق خيارات سكن مناسبة قبل سفرك بوقت كافٍ.",
  },
  {
    q: "هل السكن قريب من المدرسة دائمًا؟",
    a: "معظم خيارات السكن التي نرشحها قريبة من المدرسة أو على مسافة قصيرة بالسيارة، لأن قرب المطار والمدرسة يوفر عليك وقتًا ومالًا يوميًا طوال مدة برنامجك.",
  },
  {
    q: "هل يمكنني السكن مع طلاب آخرين من نفس بلدي؟",
    a: "في كثير من الحالات نعم، خاصة في المنازل المشتركة القريبة من مدارس تستقبل أعدادًا جيدة من الطلاب العرب. أخبرنا برغبتك عند التقديم وسنحاول مراعاتها ضمن الخيارات المتاحة.",
  },
  {
    q: "هل السعر المعلن شهري ثابت؟",
    a: "غالبًا نعم، لكن بعض الخيارات تتطلب دفعة تأمين (Deposit) قابلة للاسترداد عند المغادرة بحالة سليمة. تأكد من فهم شروط العقد كاملة قبل الالتزام.",
  },
  {
    q: "ماذا لو لم يعجبني السكن بعد الوصول؟",
    a: "نساعدك في إيجاد بديل مناسب إذا واجهت مشكلة حقيقية، لكن ننصح بشدة بمراجعة كل التفاصيل (الصور، المسافة، نوع الغرفة) بعناية قبل الحجز لتقليل هذا الاحتمال من الأساس.",
  },
];

export default function AccommodationGuidePage() {
  return (
    <GuideArticle
      path="/guides/student-accommodation-south-africa"
      kicker="السكن الطلابي"
      title="السكن في جنوب أفريقيا: دليل الطالب الدولي"
      intro="بعد التأشيرة، السكن هو أكثر ما يقلق الطلاب الجدد. إليك كل الخيارات المتاحة، وكيف تحجز بثقة قبل حتى أن تحزم حقائبك."
      faqItems={FAQ_ITEMS}
      related={[
        { title: "دراسة الطيران في جنوب أفريقيا: الدليل الشامل", href: "/guides/study-aviation-in-south-africa" },
        { title: "كم تكلفة تعلم الطيران في جنوب أفريقيا؟", href: "/guides/flight-training-cost-south-africa" },
        { title: "نصائح للنجاح في جنوب أفريقيا", href: "/guides/tips-to-succeed-in-south-africa" },
      ]}
    >
      <section id="types">
        <h2 className="font-display text-2xl text-nino-ink">أنواع السكن المتاحة</h2>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>غرفة خاصة في منزل مشترك:</strong> خصوصية أكبر، تكلفة أعلى قليلًا من الغرفة المشتركة.</li>
          <li><strong>غرفة مشتركة:</strong> الخيار الأكثر اقتصادية، وشائع بين الطلاب الجدد الذين يفضلون تقليل التكلفة والتعرف على زملاء بسرعة.</li>
          <li><strong>استوديو مستقل:</strong> أعلى تكلفة، لكن استقلالية كاملة — خيار مناسب لمن يفضل الهدوء التام.</li>
        </ul>
        <p className="mt-3">
          يمكنك{" "}
          <Link href="/accommodation" className="text-nino-orange hover:underline">
            تصفح خيارات السكن الفعلية والأسعار الشهرية
          </Link>{" "}
          المتاحة حاليًا بالقرب من كل مدرسة شريكة.
        </p>
      </section>

      <section id="cost">
        <h2 className="font-display text-2xl text-nino-ink">كم تكلف الإقامة شهريًا؟</h2>
        <p className="mt-3">
          تختلف الأسعار حسب المدينة ونوع الغرفة، لكنها بشكل عام معقولة جدًا
          مقارنة بوجهات التدريب الأخرى. لمعرفة كيف يدخل السكن ضمن ميزانيتك
          الإجمالية، راجع{" "}
          <Link href="/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">
            دليل التكلفة الشامل
          </Link>
          .
        </p>
      </section>

      <section id="how-to-choose">
        <h2 className="font-display text-2xl text-nino-ink">كيف تختار السكن المناسب؟</h2>
        <p className="mt-3">
          ثلاثة معايير عملية بترتيب الأهمية: المسافة الفعلية للمدرسة والمطار
          (تؤثر على وقتك اليومي طوال أشهر التدريب)، نوع الغرفة الذي يناسب
          ميزانيتك وشخصيتك (خاصة أم مشتركة)، ثم المرافق الإضافية (واي فاي،
          أثاث، مطبخ مشترك).
        </p>
      </section>

      <section id="booking">
        <h2 className="font-display text-2xl text-nino-ink">متى وكيف تحجز؟</h2>
        <p className="mt-3">
          بعد قبولك في المدرسة وبدء إجراءات التأشيرة، هذا هو التوقيت المثالي
          لتأكيد حجز السكن — قبل موعد سفرك بأسابيع كافية، وليس بعد وصولك.{" "}
          <Link href="/apply" className="text-nino-orange hover:underline">
            قدّم طلبك المجاني
          </Link>{" "}
          وسننسق معك خيار سكن مناسب ضمن هذا الجدول الزمني.
        </p>
      </section>
    </GuideArticle>
  );
}
