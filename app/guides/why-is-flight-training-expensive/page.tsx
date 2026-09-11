import Link from "next/link";
import { GuideArticle } from "@/components/GuideArticle";
import { SITE_URL } from "@/lib/constants";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

const META = {
  ar: {
    title: "هل تعلّم الطيران غالي فعلاً؟ ولماذا؟ | نينو إديوكيشن",
    description: "لماذا تكلفة تدريب الطيران مرتفعة، وهل يجب دفعها كاملة من أول يوم؟ شرح طريقتي الدفع: الدفع حسب الاستخدام والباقات الثابتة.",
  },
  en: {
    title: "Is Flight Training Really Expensive? And Why? | Nino Education",
    description: "Why flight training costs what it does, and whether you have to pay it all upfront. Both payment methods explained: pay-as-you-go and fixed packages.",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return { title: META[lang].title, description: META[lang].description, alternates: { canonical: `${SITE_URL}/guides/why-is-flight-training-expensive` } };
}

const FAQ_ITEMS = {
  ar: [
    { q: "هل يمكن الحصول على تخفيض إذا دفعت المبلغ كاملاً دفعة واحدة؟", a: "في كثير من الحالات نعم — بعض المدارس تقدم خصمًا مقابل الالتزام بباقة ثابتة مدفوعة مقدمًا، لأن ذلك يمنحها يقينًا ماليًا. يختلف حجم الخصم من مدرسة لأخرى، ويُفضل دائمًا سؤال المدرسة عن ذلك بشكل مباشر." },
    { q: "هل تختلف طريقة الدفع من مدرسة لأخرى؟", a: "نعم، بشكل كبير. بعض المدارس تعتمد فقط على الدفع حسب الاستخدام، وأخرى تقدم فقط باقات ثابتة، وبعضها يسمح لك بالاختيار بين الطريقتين. هذا أحد المعايير المهمة عند مقارنة المدارس، وليس فقط السعر الإجمالي." },
    { q: "ماذا لو احتجت ساعات طيران إضافية عن المتفق عليه في الباقة؟", a: "هذا سؤال يجب توضيحه مع المدرسة قبل التسجيل. عادة، الساعات الإضافية عن حد الباقة تُحسب بشكل منفصل بسعر الساعة المعلن، بغض النظر عن طريقة الدفع التي اخترتها." },
    { q: "هل نينو إديوكيشن تساعدني في اختيار الطريقة المناسبة؟", a: "بالتأكيد. جزء من عملنا هو فهم وضعك المالي وطريقة تفكيرك، ثم ترشيح مدارس تقدم طريقة الدفع الأنسب لك فعليًا، بدل ترك القرار لك بمفردك دون معلومات كافية." },
  ],
  en: [
    { q: "Can I get a discount if I pay the full amount at once?", a: "In many cases, yes — some schools offer a discount in exchange for committing to a fixed package paid upfront, since that gives them financial certainty. The discount size varies by school, and it's always best to ask the school about this directly." },
    { q: "Does the payment method differ from school to school?", a: "Yes, significantly. Some schools only offer pay-as-you-go, others only offer fixed packages, and some let you choose between the two. This is one of the important criteria when comparing schools, not just the total price." },
    { q: "What if I need flight hours beyond what's agreed in the package?", a: "This is a question to clarify with the school before enrolling. Usually, hours beyond the package limit are billed separately at the posted hourly rate, regardless of which payment method you chose." },
    { q: "Does Nino Education help me choose the right method?", a: "Absolutely. Part of our job is understanding your financial situation and how you think, then recommending schools that genuinely offer the payment method that fits you, instead of leaving the decision to you alone without enough information." },
  ],
};

function ArabicContent() {
  return (
    <>
      <section id="why-expensive">
        <h2 className="font-display text-2xl text-nino-ink">لماذا تكلفة تعلم الطيران مرتفعة أصلاً؟</h2>
        <p className="mt-3">تدريب الطيران ليس مثل أي مهارة أخرى من حيث التكلفة، والسبب بسيط: كل ساعة تدريب تحمل تكاليف تشغيلية حقيقية وثابتة، بصرف النظر عن المدرسة أو البلد.</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>الوقود:</strong> كل ساعة طيران تستهلك كمية وقود حقيقية، وسعر الوقود يتغير باستمرار.</li>
          <li><strong>صيانة الطائرة:</strong> الطائرات التدريبية تخضع لصيانة دورية صارمة محسوبة بالساعة، وقطع الغيار الجوية ليست رخيصة.</li>
          <li><strong>التأمين:</strong> تأمين الطائرات والمدربين والطلاب بند ثابت في تكلفة كل ساعة تدريب.</li>
          <li><strong>المدربون المؤهلون:</strong> تدريب وترخيص مدرب طيران معتمد عملية طويلة ومكلفة بذاتها، وهذا ينعكس على أجورهم.</li>
          <li><strong>الالتزام التنظيمي:</strong> المدارس المعتمدة من SACAA تخضع لمعايير صارمة تحتاج بنية تحتية ومتابعة مستمرة.</li>
        </ul>
        <p className="mt-3">بمعنى آخر، السعر المرتفع ليس تسعيرًا عشوائيًا — هو انعكاس مباشر لتكلفة تشغيل طائرة حقيقية بأمان لمئات الساعات.</p>
      </section>

      <section id="south-africa-value">
        <h2 className="font-display text-2xl text-nino-ink">هل جنوب أفريقيا مختلفة في هذا الجانب؟</h2>
        <p className="mt-3">
          نعم، من ناحية القيمة مقابل السعر. نفس بنود التكلفة أعلاه موجودة في أي دولة، لكن تكلفة العمالة والمعيشة والتشغيل في جنوب أفريقيا أقل بكثير من أمريكا أو أوروبا، وهذا ما يجعل السعر النهائي أوفر بشكل ملحوظ دون التنازل عن الجودة أو الاعتماد الدولي. راجع{" "}
          <Link href="/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">دليل التكلفة التفصيلي</Link>{" "}للأرقام الفعلية.
        </p>
      </section>

      <section id="pay-all-at-once">
        <h2 className="font-display text-2xl text-nino-ink">هل يجب أن تدفع المبلغ كاملاً من أول يوم؟</h2>
        <p className="mt-3">لا، وهذا من أكثر الأمور التي يخطئ الطلاب الجدد بفهمها. معظم مدارس الطيران المعتمدة تقدم أكثر من طريقة دفع، وليست مطالبًا بدفع تكلفة البرنامج الكاملة مقدمًا لتبدأ تدريبك. الطريقة المناسبة تعتمد على وضعك المالي وأهدافك.</p>
      </section>

      <section id="pay-as-you-go">
        <h2 className="font-display text-2xl text-nino-ink">الطريقة الأولى: الدفع حسب الاستخدام</h2>
        <p className="mt-3">تدفع مقابل كل مرحلة أو مجموعة ساعات طيران فعليًا، بدل دفع كل شيء مقدمًا. تحصل على درس أو مجموعة دروس، تدفع تكلفتها، ثم تنتقل للمجموعة التالية.</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>الميزة الأساسية:</strong> التزام مالي مبدئي أقل، وتدفع فقط مقابل ما تستخدمه فعليًا.</li>
          <li><strong>الفائدة العملية:</strong> إذا تعلمت بسرعة أكبر من المتوقع، لن تكون قد دفعت مقابل ساعات لم تحتجها.</li>
          <li><strong>ما يجب مراعاته:</strong> يحتاج انضباطًا في متابعة ميزانيتك بشكل مستمر طوال البرنامج، بدل رقم واحد واضح من البداية.</li>
        </ul>
      </section>

      <section id="packages">
        <h2 className="font-display text-2xl text-nino-ink">الطريقة الثانية: الباقات الثابتة</h2>
        <p className="mt-3">تدفع سعرًا إجماليًا ثابتًا لبرنامج كامل (مثل باقة تصل بك من الصفر حتى رخصة CPL)، غالبًا بخصم مقارنة بحساب كل ساعة منفصلة، وأحيانًا على دفعات مجدولة بدل دفعة واحدة كاملة.</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>الميزة الأساسية:</strong> رقم واضح ومحدد منذ البداية، يسهّل التخطيط المالي الكامل لرحلتك.</li>
          <li><strong>الفائدة العملية:</strong> غالبًا أوفر إجماليًا من الدفع حسب الاستخدام إذا أكملت البرنامج بالمعدل الطبيعي المتوقع.</li>
          <li><strong>ما يجب مراعاته:</strong> يتطلب يقينًا أكبر بالمدرسة والبرنامج قبل الالتزام، والساعات الإضافية عن حد الباقة تُحسب عادة بشكل منفصل.</li>
        </ul>
      </section>

      <section id="which-fits-you">
        <h2 className="font-display text-2xl text-nino-ink">أي طريقة تناسبك أكثر؟</h2>
        <p className="mt-3">إذا كنت تفضّل رقمًا واضحًا وثابتًا لتخطيط ميزانيتك من البداية، الباقات الثابتة عادة الخيار الأنسب. إذا كنت تفضّل مرونة أكبر والدفع تدريجيًا حسب تقدمك الفعلي، الدفع حسب الاستخدام قد يناسبك أكثر. لا توجد إجابة واحدة صحيحة لكل الطلاب.</p>
        <p className="mt-3">
          استخدم{" "}<Link href="/calculator" className="text-nino-orange hover:underline">حاسبة التكلفة</Link>{" "}لتقدير ميزانيتك الإجمالية أولًا، ثم{" "}
          <Link href="/apply" className="text-nino-orange hover:underline">قدّم طلبك المجاني</Link>{" "}لنرشح لك مدارس تقدم طريقة الدفع المناسبة لوضعك تحديدًا.
        </p>
      </section>

      <section id="limited-budget" className="rounded-3xl bg-nino-cream p-8">
        <h2 className="font-display text-2xl text-nino-ink">وإذا كانت ميزانيتك محدودة فعلاً؟</h2>
        <p className="mt-3">
          إذا كان الرقم لسه يبدو بعيد عن وضعك الحالي، هذا ما يعني إن الحلم مستحيل. فيه منح دراسية، خصومات من المدارس، وطرق تبدأ فيها بخطوة أصغر بكثير من البرنامج الكامل.{" "}
          <Link href="/scholarships" className="font-medium text-nino-orange hover:underline">شوف الطرق المتاحة لك</Link>.
        </p>
      </section>
    </>
  );
}

function EnglishContent() {
  return (
    <>
      <section id="why-expensive">
        <h2 className="font-display text-2xl text-nino-ink">Why Is Flight Training Expensive in the First Place?</h2>
        <p className="mt-3">Flight training isn&apos;t like any other skill in terms of cost, and the reason is simple: every training hour carries real, fixed operational costs, regardless of the school or country.</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>Fuel:</strong> Every flight hour consumes a real quantity of fuel, and fuel prices constantly shift.</li>
          <li><strong>Aircraft maintenance:</strong> Training aircraft undergo strict, hour-based periodic maintenance, and aviation parts aren&apos;t cheap.</li>
          <li><strong>Insurance:</strong> Insuring aircraft, instructors, and students is a fixed line item in the cost of every training hour.</li>
          <li><strong>Qualified instructors:</strong> Training and licensing a certified flight instructor is itself a long, costly process, which is reflected in their pay.</li>
          <li><strong>Regulatory compliance:</strong> SACAA-accredited schools operate under strict standards that require infrastructure and continuous oversight.</li>
        </ul>
        <p className="mt-3">In other words, the high price isn&apos;t arbitrary pricing — it&apos;s a direct reflection of the cost of safely operating an aircraft for hundreds of hours.</p>
      </section>

      <section id="south-africa-value">
        <h2 className="font-display text-2xl text-nino-ink">Is South Africa Different in This Regard?</h2>
        <p className="mt-3">
          Yes, in terms of value for price. The same cost items above exist in any country, but labor, living, and operating costs in South Africa are much lower than in the US or Europe, which makes the final price noticeably better without sacrificing quality or international accreditation. See the{" "}
          <Link href="/en/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">detailed cost guide</Link>{" "}for actual figures.
        </p>
      </section>

      <section id="pay-all-at-once">
        <h2 className="font-display text-2xl text-nino-ink">Do You Have to Pay the Full Amount Upfront?</h2>
        <p className="mt-3">No, and this is one of the things new students most often misunderstand. Most accredited flight schools offer more than one payment method, and you&apos;re not required to pay the full program cost upfront to start your training. The right method depends on your financial situation and goals.</p>
      </section>

      <section id="pay-as-you-go">
        <h2 className="font-display text-2xl text-nino-ink">Method One: Pay-As-You-Go</h2>
        <p className="mt-3">You pay for each stage or group of flight hours as you actually go, instead of paying everything upfront. You get a lesson or group of lessons, pay for it, then move to the next group.</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>Main advantage:</strong> Lower initial financial commitment, and you only pay for what you actually use.</li>
          <li><strong>Practical benefit:</strong> If you learn faster than expected, you won&apos;t have paid for hours you didn&apos;t need.</li>
          <li><strong>What to consider:</strong> Requires discipline in continuously tracking your budget throughout the program, instead of one clear number from the start.</li>
        </ul>
      </section>

      <section id="packages">
        <h2 className="font-display text-2xl text-nino-ink">Method Two: Fixed Packages</h2>
        <p className="mt-3">You pay one fixed total price for a complete program (like a package that takes you from zero to a CPL), often at a discount compared to calculating each hour separately, and sometimes in scheduled installments instead of one full payment.</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>Main advantage:</strong> A clear, defined number from the start, making full financial planning for your journey easier.</li>
          <li><strong>Practical benefit:</strong> Usually cheaper overall than pay-as-you-go if you complete the program at the expected normal pace.</li>
          <li><strong>What to consider:</strong> Requires more certainty about the school and program before committing, and hours beyond the package limit are usually billed separately.</li>
        </ul>
      </section>

      <section id="which-fits-you">
        <h2 className="font-display text-2xl text-nino-ink">Which Method Fits You Better?</h2>
        <p className="mt-3">If you prefer a clear, fixed number to plan your budget from the start, fixed packages are usually the better fit. If you prefer more flexibility and paying gradually based on your actual progress, pay-as-you-go might suit you more. There&apos;s no single right answer for every student.</p>
        <p className="mt-3">
          Use the{" "}<Link href="/en/calculator" className="text-nino-orange hover:underline">cost calculator</Link>{" "}to estimate your total budget first, then{" "}
          <Link href="/en/apply" className="text-nino-orange hover:underline">submit your free application</Link>{" "}and we&apos;ll recommend schools that offer the payment method that genuinely fits your situation.
        </p>
      </section>

      <section id="limited-budget" className="rounded-3xl bg-nino-cream p-8">
        <h2 className="font-display text-2xl text-nino-ink">And What If Your Budget Is Genuinely Limited?</h2>
        <p className="mt-3">
          If the number still feels far from your current situation, that doesn&apos;t mean the dream is impossible. There are scholarships, school discounts, and ways to start with a step much smaller than the full program.{" "}
          <Link href="/en/scholarships" className="font-medium text-nino-orange hover:underline">See the paths available to you</Link>.
        </p>
      </section>
    </>
  );
}

export default async function WhyExpensiveGuidePage() {
  const lang: Lang = await getLang();
  const kicker = lang === "ar" ? "التمويل والتكلفة" : "Financing and Cost";
  const title = lang === "ar" ? "هل تعلّم الطيران غالي فعلاً؟ ولماذا؟" : "Is Flight Training Really Expensive? And Why?";
  const intro = lang === "ar"
    ? "رقم كبير يظهر أمامك أول مرة تبحث عن تكلفة تدريب الطيران، ويثير سؤالًا منطقيًا: هل هذا السعر مبرر؟ وهل يجب دفعه كاملاً من أول يوم؟"
    : "A big number shows up the first time you look into flight training cost, and it raises a logical question: is this price justified? And do you have to pay it all upfront?";

  const related = lang === "ar"
    ? [
        { title: "منح وخصومات لتعلم الطيران", href: "/scholarships" },
        { title: "كم تكلفة تعلم الطيران في جنوب أفريقيا؟", href: "/guides/flight-training-cost-south-africa" },
        { title: "كيف تختار أفضل مدرسة طيران؟", href: "/guides/how-to-choose-a-flight-school" },
        { title: "الفرق بين PPL و CPL", href: "/guides/ppl-vs-cpl" },
      ]
    : [
        { title: "Scholarships & Discounts for Aviation Training", href: "/en/scholarships" },
        { title: "How Much Does Flight Training Cost in South Africa?", href: "/en/guides/flight-training-cost-south-africa" },
        { title: "How to Choose the Best Flight School?", href: "/en/guides/how-to-choose-a-flight-school" },
        { title: "PPL vs CPL", href: "/en/guides/ppl-vs-cpl" },
      ];

  return (
    <GuideArticle
      path="/guides/why-is-flight-training-expensive"
      lang={lang}
      kicker={kicker}
      title={title}
      intro={intro}
      faqItems={FAQ_ITEMS[lang]}
      related={related}
    >
      {lang === "ar" ? <ArabicContent /> : <EnglishContent />}
    </GuideArticle>
  );
}
