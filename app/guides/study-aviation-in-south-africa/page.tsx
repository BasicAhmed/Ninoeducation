import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/constants";
import { GUIDES } from "@/lib/guides";
import { getLang } from "@/lib/i18n/get-lang";
import type { Lang } from "@/lib/i18n/dictionaries";

const META = {
  ar: {
    title: "دراسة الطيران في جنوب أفريقيا: الدليل الشامل 2026 | نينو إديوكيشن",
    description:
      "كل ما يحتاج الطالب العربي معرفته عن دراسة الطيران في جنوب أفريقيا: التكلفة، أنواع الرخص، مدة التدريب، التأشيرة، السكن، وأفضل المدارس المعتمدة.",
  },
  en: {
    title: "Studying Aviation in South Africa: The Complete 2026 Guide | Nino Education",
    description:
      "Everything international students need to know about studying aviation in South Africa: cost, license types, training duration, visa, housing, and accredited schools.",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return {
    title: META[lang].title,
    description: META[lang].description,
    alternates: { canonical: `${SITE_URL}/guides/study-aviation-in-south-africa` },
  };
}

const FAQ_ITEMS = {
  ar: [
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
  ],
  en: [
    {
      q: "Is South Africa a good choice for aviation training?",
      a: "Yes — South Africa is one of the most popular destinations for Arab and Indian students for pilot training, thanks to internationally-recognized SACAA accreditation, weather suitable for training year-round, and a much lower cost compared to the US, Europe, or even some Arab countries.",
    },
    {
      q: "How much does a Commercial Pilot License (CPL) cost in South Africa?",
      a: "The total cost of an integrated program from zero to a CPL typically ranges from about $40,000 to $100,000, depending on the school, the path (integrated or modular), and the number of flight hours required. Use the cost calculator for a more accurate estimate based on your situation.",
    },
    {
      q: "Is a SACAA license internationally recognized?",
      a: "Yes. The South African Civil Aviation Authority (SACAA) is accredited by the International Civil Aviation Organization (ICAO), meaning your license can be converted for use in most countries in the world, including the Gulf states, after meeting local conversion requirements.",
    },
    {
      q: "Do international students need a study visa?",
      a: "Yes, non-South African students need a study visa before beginning training. Core documents typically include an acceptance letter from the school, proof of financial means, and a passport valid for a sufficient period. Nino Education guides you step by step through this process after your acceptance.",
    },
    {
      q: "How long does it take to go from zero to a professional pilot?",
      a: "It depends on the path and target license, but an integrated program from zero to a CPL typically takes 12 to 18 months, while some modular paths or ATPL goals need additional time to build up flight hours.",
    },
  ],
};

const KICKER = { ar: "الدليل الشامل · محدّث لعام 2026", en: "The Complete Guide · Updated for 2026" };
const H1 = {
  ar: "دراسة الطيران في جنوب أفريقيا: كل ما تحتاج معرفته",
  en: "Studying Aviation in South Africa: Everything You Need to Know",
};
const INTRO = {
  ar: "إذا كنت تفكر جديًا في أن تصبح طيارًا، فجنوب أفريقيا واحدة من أكثر الوجهات التي يقصدها الطلاب العرب والهنود سنويًا. هذا الدليل يجمع كل الأسئلة العملية التي يسألها كل طالب قبل اتخاذ القرار — بدون مبالغة تسويقية.",
  en: "If you're seriously considering becoming a pilot, South Africa is one of the top destinations Arab and Indian students choose every year. This guide brings together every practical question a student asks before deciding — without marketing exaggeration.",
};

function ArabicBody() {
  return (
    <>
      <section id="why">
        <h2 className="font-display text-2xl text-nino-ink">لماذا جنوب أفريقيا تحديدًا؟</h2>
        <p className="mt-3">أربعة أسباب عملية تجعل جنوب أفريقيا خيارًا متكررًا بين الطلاب الدوليين:</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>اعتماد دولي حقيقي:</strong> هيئة الطيران المدني الجنوب أفريقية (SACAA) معتمدة من منظمة الطيران المدني الدولي (ICAO)، فرخصتك ليست محلية الاستخدام فقط.</li>
          <li><strong>طقس يسمح بالتدريب طوال السنة:</strong> أكثر من 300 يوم مشمس سنويًا في معظم مناطق التدريب، ما يعني تدريبًا أسرع وساعات طيران فعلية أكثر بدلًا من انتظار الطقس المناسب لأشهر.</li>
          <li><strong>تكلفة أقل بكثير:</strong> تدريب بجودة عالمية بجزء من تكلفة الولايات المتحدة أو أوروبا، وأحيانًا أقل من بعض الدول العربية نفسها.</li>
          <li><strong>بيئة إنجليزية جاهزة:</strong> التدريب والاختبارات بالكامل بالإنجليزية، دون الحاجة لتعلم لغة جديدة أولًا.</li>
        </ul>
      </section>

      <section id="cost">
        <h2 className="font-display text-2xl text-nino-ink">كم تكلفة دراسة الطيران في جنوب أفريقيا؟</h2>
        <p className="mt-3">التكلفة تختلف حسب الرخصة المستهدفة والمدرسة ونوع المسار (متكامل أو معياري)، لكن كمرجع تقريبي لبرنامج متكامل من الصفر حتى رخصة طيار تجاري (CPL):</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>رخصة طيار خاص (PPL) فقط: عادة تبدأ من حوالي 15,000–25,000 دولار.</li>
          <li>مسار متكامل حتى رخصة طيار تجاري (CPL): غالبًا بين 40,000–100,000 دولار.</li>
          <li>إضافات شائعة: تصنيف آلي (IR)، متعدد المحركات (ME)، ونظري ATPL — كل منها يضيف تكلفة منفصلة.</li>
        </ul>
        <p className="mt-3">
          هذه أرقام تقريبية فقط — الأسعار الفعلية تختلف بين المدارس وتتغير دوريًا. للحصول على تقدير أدق حسب ميزانيتك وأهدافك، استخدم{" "}
          <Link href="/calculator" className="text-nino-orange hover:underline">حاسبة التكلفة</Link>{" "}
          أو{" "}
          <Link href="/schools" className="text-nino-orange hover:underline">قارن أسعار المدارس مباشرة</Link>
          . للتفاصيل الكاملة، راجع{" "}
          <Link href="/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">دليل التكلفة الشامل</Link>.
        </p>
      </section>

      <section id="licenses">
        <h2 className="font-display text-2xl text-nino-ink">أنواع رخص الطيران: من أين تبدأ؟</h2>
        <p className="mt-3">معظم الطلاب يمرون بنفس التسلسل التقريبي، وإن كان بعضهم يقفز مباشرة لمسار متكامل يجمع أكثر من رخصة معًا:</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>PPL (رخصة طيار خاص):</strong> نقطة البداية للجميع — تسمح لك بالطيران لأغراض شخصية غير تجارية.</li>
          <li><strong>IR (تصنيف آلي):</strong> يؤهلك للطيران بالاعتماد على الأجهزة في ظروف رؤية محدودة.</li>
          <li><strong>ME (متعدد المحركات):</strong> تأهيل على طائرات بمحركين، مطلوب لمعظم وظائف شركات الطيران.</li>
          <li><strong>CPL (رخصة طيار تجاري):</strong> الرخصة التي تؤهلك فعليًا للعمل كطيار محترف ومتلقي أجر.</li>
          <li><strong>ATPL Theory (نظري رخصة النقل الجوي):</strong> أعلى مستوى نظري، خطوة أساسية نحو العمل في شركات الطيران الكبرى.</li>
        </ul>
        <p className="mt-3">
          يمكنك تصفح{" "}
          <Link href="/schools" className="text-nino-orange hover:underline">المدارس المعتمدة حسب الرخصة التي تستهدفها</Link>{" "}
          لمعرفة أيها يقدم المسار الذي يناسبك، أو اقرأ{" "}
          <Link href="/guides/ppl-vs-cpl" className="text-nino-orange hover:underline">مقارنة تفصيلية بين PPL وCPL</Link>.
        </p>
      </section>

      <section id="duration">
        <h2 className="font-display text-2xl text-nino-ink">كم تستغرق مدة التدريب؟</h2>
        <p className="mt-3">
          البرنامج المتكامل من الصفر حتى رخصة CPL يستغرق عادة بين 12 و18 شهرًا، بافتراض تدريب متواصل بدون انقطاعات كبيرة. المسارات المعيارية (خطوة بخطوة، رخصة بعد رخصة) قد تأخذ وقتًا أطول لأنها تعتمد على تجميع ساعات الطيران تدريجيًا، أحيانًا بين رحلات متباعدة. راجع{" "}
          <Link href="/guides/how-long-to-become-a-pilot" className="text-nino-orange hover:underline">الجدول الزمني التفصيلي</Link>{" "}
          لمعرفة ما يؤثر فعليًا على المدة.
        </p>
      </section>

      <section id="requirements">
        <h2 className="font-display text-2xl text-nino-ink">متطلبات القبول والتأشيرة الطلابية</h2>
        <p className="mt-3">
          المتطلبات الأساسية تختلف قليلًا بين المدارس، لكنها غالبًا تشمل: جواز سفر ساري المفعول، شهادة ثانوية عامة، مستوى إنجليزي مقبول (لا يشترط أن يكون ممتازًا من البداية)، وشهادة طبية أولية من طبيب طيران معتمد — راجع{" "}
          <Link href="/guides/sacaa-medical-requirements" className="text-nino-orange hover:underline">دليل المتطلبات الطبية</Link>{" "}
          للتفاصيل.
        </p>
        <p className="mt-3">
          بعد قبولك، ستحتاج تأشيرة دراسة (Study Visa) للدخول القانوني والتدريب في جنوب أفريقيا. المستندات الأساسية عادة تشمل خطاب قبول من المدرسة، إثبات قدرة مالية على تغطية التكاليف، وجواز سفر ساري لمدة كافية. راجع{" "}
          <Link href="/guides/south-africa-study-visa" className="text-nino-orange hover:underline">دليل التأشيرة الكامل خطوة بخطوة</Link>{" "}
          — نينو إديوكيشن يرشدك في هذه العملية بعد قبولك في المدرسة المناسبة.
        </p>
      </section>

      <section id="accommodation">
        <h2 className="font-display text-2xl text-nino-ink">السكن وتكلفة المعيشة</h2>
        <p className="mt-3">
          تختلف تكلفة المعيشة حسب المدينة ونمط السكن (غرفة خاصة، غرفة مشتركة، أو استوديو)، لكنها بشكل عام أقل بكثير من تكلفة المعيشة في أوروبا أو أمريكا الشمالية. ننسق خيارات سكن قريبة من المدرسة قبل وصولك، حتى لا تصل ولا تعرف أين ستقيم.
        </p>
        <p className="mt-3">
          يمكنك{" "}
          <Link href="/accommodation" className="text-nino-orange hover:underline">تصفح خيارات السكن المتاحة</Link>{" "}
          بالقرب من كل مدرسة، مع الأسعار التقديرية الشهرية. للتفاصيل الكاملة، راجع{" "}
          <Link href="/guides/student-accommodation-south-africa" className="text-nino-orange hover:underline">دليل السكن الشامل</Link>.
        </p>
      </section>

      <section id="apply">
        <h2 className="font-display text-2xl text-nino-ink">كيف تبدأ فعليًا؟</h2>
        <p className="mt-3">
          الخطوات عادة تسير بهذا الترتيب: مقارنة المدارس حسب ميزانيتك وأهدافك، تقديم طلب واحد عبر نينو إديوكيشن (بدون أي رسوم عليك)، استلام خطاب قبول أولي من المدرسة المناسبة، ثم البدء بترتيب التأشيرة والسكن والسفر بمساعدتنا.
        </p>
        <p className="mt-3">
          إذا كنت غير متأكد من أي رخصة أو مدرسة تناسبك، جرّب{" "}
          <Link href="/quiz" className="text-nino-orange hover:underline">أداة البحث عن مدرستك المناسبة</Link>{" "}
          — ثلاثة أسئلة فقط وتحصل على ترشيحات مباشرة، أو راجع{" "}
          <Link href="/guides/how-to-choose-a-flight-school" className="text-nino-orange hover:underline">دليل اختيار المدرسة المناسبة</Link>.
        </p>
      </section>

      <section id="after">
        <h2 className="font-display text-2xl text-nino-ink">ماذا يحدث بعد التخرج؟</h2>
        <p className="mt-3">
          بعد الحصول على رخصتك، رخصة SACAA المعتمدة من ICAO قابلة للتحويل لمعظم دول العالم بعد استيفاء متطلبات التحويل المحلية. يفتح هذا المجال للتقديم على شركات طيران في الخليج ومصر وغيرها، أو العمل كمدرب طيران لتجميع ساعات إضافية قبل الانتقال لشركات الطيران الكبرى. راجع{" "}
          <Link href="/guides/pilot-salary-and-jobs" className="text-nino-orange hover:underline">دليل فرص العمل والرواتب</Link>{" "}
          لنظرة واقعية على هذا المسار.
        </p>
      </section>
    </>
  );
}

function EnglishBody() {
  return (
    <>
      <section id="why">
        <h2 className="font-display text-2xl text-nino-ink">Why South Africa, Specifically?</h2>
        <p className="mt-3">Four practical reasons South Africa is a recurring choice among international students:</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>Genuine international accreditation:</strong> The South African Civil Aviation Authority (SACAA) is accredited by the International Civil Aviation Organization (ICAO), so your license isn&apos;t just usable locally.</li>
          <li><strong>Weather that allows year-round training:</strong> Over 300 sunny days a year in most training areas, meaning faster training and more actual flight hours instead of waiting months for suitable weather.</li>
          <li><strong>Much lower cost:</strong> World-class training at a fraction of the cost of the US or Europe, and sometimes lower than some Arab countries themselves.</li>
          <li><strong>An English-ready environment:</strong> Training and exams are entirely in English, with no need to learn a new language first.</li>
        </ul>
      </section>

      <section id="cost">
        <h2 className="font-display text-2xl text-nino-ink">How Much Does Studying Aviation in South Africa Cost?</h2>
        <p className="mt-3">Cost varies by target license, school, and path (integrated or modular), but as a rough reference for an integrated program from zero to a Commercial Pilot License (CPL):</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li>PPL alone: typically starts around $15,000–25,000.</li>
          <li>Integrated path through CPL: often $40,000–100,000.</li>
          <li>Common add-ons: Instrument Rating (IR), Multi-Engine (ME), and ATPL theory — each adds a separate cost.</li>
        </ul>
        <p className="mt-3">
          These are approximate figures only — actual prices vary between schools and change periodically. For a more accurate estimate for your budget and goals, use the{" "}
          <Link href="/en/calculator" className="text-nino-orange hover:underline">cost calculator</Link>{" "}
          or{" "}
          <Link href="/en/schools" className="text-nino-orange hover:underline">compare school prices directly</Link>
          . For full details, see the{" "}
          <Link href="/en/guides/flight-training-cost-south-africa" className="text-nino-orange hover:underline">complete cost guide</Link>.
        </p>
      </section>

      <section id="licenses">
        <h2 className="font-display text-2xl text-nino-ink">Types of Pilot Licenses: Where Do You Start?</h2>
        <p className="mt-3">Most students go through roughly the same sequence, though some jump straight into an integrated path combining more than one license:</p>
        <ul className="mt-3 list-inside list-disc space-y-2">
          <li><strong>PPL (Private Pilot License):</strong> The starting point for everyone — lets you fly for personal, non-commercial purposes.</li>
          <li><strong>IR (Instrument Rating):</strong> Qualifies you to fly relying on instruments in limited-visibility conditions.</li>
          <li><strong>ME (Multi-Engine):</strong> Qualification on twin-engine aircraft, required for most airline jobs.</li>
          <li><strong>CPL (Commercial Pilot License):</strong> The license that actually qualifies you to work as a paid, professional pilot.</li>
          <li><strong>ATPL Theory (Airline Transport Pilot theory):</strong> The highest theoretical level, an essential step toward working at major airlines.</li>
        </ul>
        <p className="mt-3">
          You can browse{" "}
          <Link href="/en/schools" className="text-nino-orange hover:underline">accredited schools by your target license</Link>{" "}
          to see which offers the right path for you, or read a{" "}
          <Link href="/en/guides/ppl-vs-cpl" className="text-nino-orange hover:underline">detailed comparison between PPL and CPL</Link>.
        </p>
      </section>

      <section id="duration">
        <h2 className="font-display text-2xl text-nino-ink">How Long Does Training Take?</h2>
        <p className="mt-3">
          An integrated program from zero through a CPL typically takes 12 to 18 months, assuming continuous training with no major interruptions. Modular paths (step by step, license after license) can take longer since they depend on building up flight hours gradually, sometimes between spaced-out flights. See the{" "}
          <Link href="/en/guides/how-long-to-become-a-pilot" className="text-nino-orange hover:underline">detailed timeline</Link>{" "}
          to see what actually affects duration.
        </p>
      </section>

      <section id="requirements">
        <h2 className="font-display text-2xl text-nino-ink">Admission Requirements and the Student Visa</h2>
        <p className="mt-3">
          Basic requirements vary slightly between schools, but generally include: a valid passport, a high school diploma, an acceptable English level (not required to be excellent from the start), and an initial medical certificate from an approved aviation doctor — see the{" "}
          <Link href="/en/guides/sacaa-medical-requirements" className="text-nino-orange hover:underline">medical requirements guide</Link>{" "}
          for details.
        </p>
        <p className="mt-3">
          After acceptance, you&apos;ll need a study visa for legal entry and training in South Africa. Core documents typically include an acceptance letter from the school, proof of financial means to cover costs, and a passport valid for a sufficient period. See the{" "}
          <Link href="/en/guides/south-africa-study-visa" className="text-nino-orange hover:underline">complete step-by-step visa guide</Link>{" "}
          — Nino Education guides you through this process after you&apos;re accepted at the right school.
        </p>
      </section>

      <section id="accommodation">
        <h2 className="font-display text-2xl text-nino-ink">Housing and Cost of Living</h2>
        <p className="mt-3">
          Cost of living varies by city and housing style (private room, shared room, or studio), but is generally much lower than living costs in Europe or North America. We coordinate housing options near the school before you arrive, so you never land without knowing where you&apos;ll stay.
        </p>
        <p className="mt-3">
          You can{" "}
          <Link href="/en/accommodation" className="text-nino-orange hover:underline">browse available housing options</Link>{" "}
          near each school, with estimated monthly prices. For full details, see the{" "}
          <Link href="/en/guides/student-accommodation-south-africa" className="text-nino-orange hover:underline">complete housing guide</Link>.
        </p>
      </section>

      <section id="apply">
        <h2 className="font-display text-2xl text-nino-ink">How Do You Actually Get Started?</h2>
        <p className="mt-3">
          The steps usually go in this order: comparing schools by your budget and goals, submitting a single application through Nino Education (at no cost to you), receiving an initial acceptance letter from the right school, then starting to arrange your visa, housing, and travel with our help.
        </p>
        <p className="mt-3">
          If you&apos;re not sure which license or school fits you, try the{" "}
          <Link href="/en/quiz" className="text-nino-orange hover:underline">Find My School tool</Link>{" "}
          — just three questions and you get direct recommendations, or see the{" "}
          <Link href="/en/guides/how-to-choose-a-flight-school" className="text-nino-orange hover:underline">guide to choosing the right school</Link>.
        </p>
      </section>

      <section id="after">
        <h2 className="font-display text-2xl text-nino-ink">What Happens After Graduation?</h2>
        <p className="mt-3">
          Once you have your license, your ICAO-accredited SACAA license is convertible in most countries in the world after meeting local conversion requirements. This opens the door to applying at airlines in the Gulf, Egypt, and elsewhere, or working as a flight instructor to build additional hours before moving to major airlines. See the{" "}
          <Link href="/en/guides/pilot-salary-and-jobs" className="text-nino-orange hover:underline">jobs and salaries guide</Link>{" "}
          for a realistic look at this path.
        </p>
      </section>
    </>
  );
}

const FAQ_HEADING = { ar: "أسئلة شائعة", en: "Frequently Asked Questions" };
const RELATED_HEADING = { ar: "أدلة ذات صلة", en: "Related Guides" };
const CTA = {
  ar: { title: "جاهز تبدأ ملفك؟", body: "قدّم طلبك مجانًا اليوم، ونرشح لك أفضل المدارس المناسبة لميزانيتك وأهدافك.", apply: "قدّم الآن", browse: "تصفح المدارس" },
  en: { title: "Ready to Start Your File?", body: "Submit your free application today, and we'll recommend the best schools for your budget and goals.", apply: "Apply Now", browse: "Browse Schools" },
};

export default async function StudyAviationGuidePage() {
  const lang: Lang = await getLang();
  const faqItems = FAQ_ITEMS[lang];
  const cta = CTA[lang];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: H1[lang],
    description: lang === "ar" ? "دليل شامل حول تكلفة ومتطلبات ومدة دراسة الطيران في جنوب أفريقيا للطلاب الدوليين." : "A complete guide to the cost, requirements, and duration of studying aviation in South Africa for international students.",
    author: { "@type": "Organization", name: "نينو إديوكيشن" },
    publisher: { "@type": "Organization", name: "نينو إديوكيشن" },
    mainEntityOfPage: `${SITE_URL}${lang === "en" ? "/en" : ""}/guides/study-aviation-in-south-africa`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
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
          <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">{KICKER[lang]}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{H1[lang]}</h1>
          <p className="mt-4 text-lg text-nino-ink/70">{INTRO[lang]}</p>

          <div className="mt-10 space-y-14 leading-relaxed text-nino-ink/80">
            {lang === "ar" ? <ArabicBody /> : <EnglishBody />}
          </div>

          {/* FAQ */}
          <section className="mt-16 border-t border-nino-line pt-10">
            <h2 className="font-display text-2xl">{FAQ_HEADING[lang]}</h2>
            <div className="mt-6 divide-y divide-nino-line">
              {faqItems.map((item) => (
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
            <h2 className="font-display text-xl">{RELATED_HEADING[lang]}</h2>
            <ul className="mt-4 space-y-2">
              {GUIDES.filter((g) => g.href !== "/guides/study-aviation-in-south-africa").map((g) => (
                <li key={g.href}>
                  <Link href={lang === "en" ? `/en${g.href}` : g.href} className="text-nino-orange hover:underline">
                    {lang === "ar" ? g.titleAr : g.titleEn} ←
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Final CTA */}
          <div className="mt-16 rounded-2xl bg-nino-ink px-8 py-10 text-center text-white">
            <h2 className="font-display text-2xl">{cta.title}</h2>
            <p className="mt-2 text-white/70">{cta.body}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href={lang === "en" ? "/en/apply" : "/apply"}
                className="rounded-full bg-nino-orange px-6 py-3 text-sm font-medium hover:bg-white hover:text-nino-ink"
              >
                {cta.apply}
              </Link>
              <Link
                href={lang === "en" ? "/en/schools" : "/schools"}
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium hover:bg-white/10"
              >
                {cta.browse}
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
