import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "الفرق بين رخصة PPL و CPL: أيهما تحتاج؟ | نينو إديوكيشن",
  description:
    "مقارنة شاملة بين رخصة الطيار الخاص (PPL) ورخصة الطيار التجاري (CPL): التكلفة، المتطلبات، ماذا تسمح لك بفعله، وأيهما تبدأ به.",
  alternates: { canonical: `${SITE_URL}/guides/ppl-vs-cpl` },
};

const FAQ_ITEMS = [
  {
    q: "هل يمكنني الحصول على CPL مباشرة بدون PPL؟",
    a: "لا، PPL هي دائمًا الخطوة الأولى. لا توجد مدرسة أو هيئة طيران تسمح بتخطيها — CPL مبني فعليًا فوق أساس ساعات ومهارات PPL. لكن المسار المتكامل يجمع كل الرخص في برنامج واحد متواصل، فلا تشعر عمليًا وكأنك 'توقفت' عند PPL.",
  },
  {
    q: "كم ساعة طيران أحتاج لكل رخصة؟",
    a: "PPL يتطلب عادة 45 ساعة طيران كحد أدنى حسب معايير SACAA. CPL يتطلب حد أدنى أعلى بكثير، يصل غالبًا إلى 200 ساعة إجمالية (تشمل ساعات PPL)، حسب المسار وقواعد المدرسة.",
  },
  {
    q: "هل PPL يسمح لي بالعمل كطيار؟",
    a: "لا. PPL رخصة شخصية بحتة — يمكنك الطيران لنفسك أو لعائلتك، لكن لا يمكنك تلقي أجر مقابل الطيران. للعمل كطيار محترف بأي شكل (نقل ركاب، شحن، تدريب)، تحتاج CPL على الأقل.",
  },
  {
    q: "هل أحتاج IR أو ME أيضًا؟",
    a: "إذا كان هدفك النهائي العمل في شركة طيران، فنعم — تصنيف آلي (IR) ومتعدد المحركات (ME) شبه إلزاميين عمليًا لمعظم وظائف شركات الطيران، حتى لو لم تكن جزءًا رسميًا من متطلبات CPL نفسها.",
  },
  {
    q: "أيهما أرخص، وهل يستحق الأمر البدء بـPPL فقط؟",
    a: "PPL وحده أرخص بكثير من مسار CPL الكامل، وهو خيار منطقي إذا كان هدفك الطيران كهواية فقط. لكن إذا كان هدفك النهائي الاحتراف، فالمسار المتكامل عادة أوفر من حيث التكلفة الإجمالية والوقت مقارنة بالبدء بـPPL منفصلًا ثم التفكير لاحقًا في CPL.",
  },
];

export default function PplVsCplPage() {
  return (
    <GuideArticle
      path="/guides/ppl-vs-cpl"
      kicker="مقارنة رخص الطيران"
      title="الفرق بين PPL و CPL: أيهما تحتاج فعلًا؟"
      intro="هذا أكثر سؤال يسأله كل طالب جديد قبل حتى اختيار مدرسة. الفرق ليس فقط في الاسم — بل في التكلفة، المدة، وما يُسمح لك بفعله بعد التخرج."
      faqItems={FAQ_ITEMS}
      related={[
        { title: "دراسة الطيران في جنوب أفريقيا: الدليل الشامل", href: "/guides/study-aviation-in-south-africa" },
        { title: "كم تستغرق مدة دراسة الطيران؟", href: "/guides/how-long-to-become-a-pilot" },
        { title: "كم تكلفة تعلم الطيران في جنوب أفريقيا؟", href: "/guides/flight-training-cost-south-africa" },
      ]}
    >
      <section id="quick-answer">
        <h2 className="font-display text-2xl text-nino-ink">الإجابة السريعة</h2>
        <p className="mt-3">
          <strong>PPL (رخصة طيار خاص)</strong> هي نقطة البداية للجميع — تسمح لك
          بالطيران لأغراض شخصية فقط، بدون أجر. <strong>CPL (رخصة طيار تجاري)</strong>{" "}
          هي الرخصة التي تؤهلك فعليًا للعمل كطيار محترف ومتلقي أجر. لا يمكنك
          الحصول على CPL دون المرور بـPPL أولًا — فالفرق ليس &quot;إما/أو&quot;، بل
          تسلسل تدريجي.
        </p>
      </section>

      <section id="comparison-table">
        <h2 className="font-display text-2xl text-nino-ink">مقارنة جنبًا إلى جنب</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-nino-line">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="bg-nino-cream">
              <tr>
                <th className="p-3 text-start font-medium">المعيار</th>
                <th className="p-3 text-start font-medium">PPL</th>
                <th className="p-3 text-start font-medium">CPL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nino-line">
              <tr>
                <td className="p-3 text-nino-ink/60">الهدف</td>
                <td className="p-3">طيران شخصي / هواية</td>
                <td className="p-3">العمل كطيار محترف</td>
              </tr>
              <tr>
                <td className="p-3 text-nino-ink/60">الحد الأدنى لساعات الطيران</td>
                <td className="p-3">≈ 45 ساعة</td>
                <td className="p-3">≈ 200 ساعة إجمالية</td>
              </tr>
              <tr>
                <td className="p-3 text-nino-ink/60">هل يسمح بأجر؟</td>
                <td className="p-3">لا</td>
                <td className="p-3">نعم</td>
              </tr>
              <tr>
                <td className="p-3 text-nino-ink/60">التكلفة التقريبية</td>
                <td className="p-3">$15,000–25,000</td>
                <td className="p-3">$40,000–100,000 (مسار كامل)</td>
              </tr>
              <tr>
                <td className="p-3 text-nino-ink/60">خطوة تالية منطقية</td>
                <td className="p-3">CPL، أو التوقف هنا كهواية</td>
                <td className="p-3">IR، ME، ثم شركات الطيران</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-nino-ink/50">
          أرقام تقريبية للمرجعية فقط — راجع{" "}
          <Link href="/calculator" className="text-nino-orange hover:underline">
            حاسبة التكلفة
          </Link>{" "}
          لتقدير أدق حسب المدرسة والمسار.
        </p>
      </section>

      <section id="which-to-choose">
        <h2 className="font-display text-2xl text-nino-ink">أي مسار تختار؟</h2>
        <p className="mt-3">
          إذا كان هدفك النهائي هو العمل كطيار — في شركة طيران، أو كطيار خاص
          لشركة، أو حتى مدرب طيران — فابدأ مباشرة بمسار متكامل يجمع PPL وCPL
          (وعادة IR وME أيضًا) في برنامج واحد متواصل. هذا عادة أوفر وقتًا
          وتكلفة من التوقف عند PPL ثم العودة لاحقًا لإكمال المسار.
        </p>
        <p className="mt-3">
          أما إذا كان هدفك الطيران كهواية فقط بدون نية العمل بأجر، فـPPL وحده
          خيار كافٍ ومنطقي من ناحية التكلفة.
        </p>
        <p className="mt-3">
          تقدر{" "}
          <Link href="/quiz" className="text-nino-orange hover:underline">
            تجرب أداة البحث عن مدرستك المناسبة
          </Link>{" "}
          لو ما كنت متأكد أي مسار يناسب وضعك وميزانيتك.
        </p>
      </section>
    </GuideArticle>
  );
}
