export const dictionaries = {
  ar: {
    nav: {
      schools: "مدارس الطيران",
      accommodation: "السكن الطلابي",
      quiz: "ابحث عن مدرستي",
      calculator: "حاسبة التكلفة",
      apply: "قدّم الآن",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
    },
    footer: {
      brand: "نينو إديوكيشن",
      tagline:
        "نساعد الطلاب العرب على الدراسة والتدرب ليصبحوا طيارين في جنوب أفريقيا، دون أي رسوم على الطالب.",
      linksHeading: "روابط",
      track: "تتبّع طلبك",
      contactHeading: "تواصل معنا",
      whatsapp: "واتساب نينو إديوكيشن",
      rights: "نينو إديوكيشن. جميع الأسعار تقديرية وقابلة للتغيير من قبل مدارس الطيران.",
    },
    hero: {
      coords: "OR Tambo · FAJS · 26.13°S, 28.24°E",
      titleLine1: "طريقك إلى قمرة القيادة",
      titleLine2: "يبدأ من هنا.",
      subtitle:
        "نينو إديوكيشن تساعد الطلاب العرب على إيجاد ومقارنة والتقديم لأفضل مدارس الطيران في جنوب أفريقيا — دون أي تكلفة عليك.",
      ctaPrimary: "ابحث عن مدرستي",
      ctaSecondary: "لماذا جنوب أفريقيا؟",
    },
    trustBar: {
      sacaaLabel: "مدارس معتمدة من SACAA",
      sacaaSub: "هيئة الطيران المدني الجنوب أفريقية",
      icaoLabel: "رخصة معتمدة من ICAO",
      icaoSub: "قابلة للتحويل عالميًا",
      schoolsLabel: "+30 مدرسة شريكة",
      schoolsSub: "في جميع أنحاء جنوب أفريقيا",
      feesLabel: "0 رسوم على الطالب",
      feesSub: "الخدمة مجانية بالكامل",
    },
  },
  en: {
    nav: {
      schools: "Flight Schools",
      accommodation: "Student Housing",
      quiz: "Find My School",
      calculator: "Cost Calculator",
      apply: "Apply Now",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    footer: {
      brand: "Nino Education",
      tagline:
        "We help Arab students study and train to become pilots in South Africa, with no fees to the student.",
      linksHeading: "Links",
      track: "Track Your Application",
      contactHeading: "Contact Us",
      whatsapp: "WhatsApp Nino Education",
      rights: "Nino Education. All prices are estimates and subject to change by the flight schools.",
    },
    hero: {
      coords: "OR Tambo · FAJS · 26.13°S, 28.24°E",
      titleLine1: "Your path to the cockpit",
      titleLine2: "starts here.",
      subtitle:
        "Nino Education helps Arab students find, compare, and apply to the best flight schools in South Africa — at no cost to you.",
      ctaPrimary: "Find My School",
      ctaSecondary: "Why South Africa?",
    },
    trustBar: {
      sacaaLabel: "SACAA-Accredited Schools",
      sacaaSub: "South African Civil Aviation Authority",
      icaoLabel: "ICAO-Recognized License",
      icaoSub: "Transferable worldwide",
      schoolsLabel: "+30 Partner Schools",
      schoolsSub: "Across South Africa",
      feesLabel: "0 Fees to Students",
      feesSub: "The service is completely free",
    },
  },
} as const;

export type Lang = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)["ar"];
