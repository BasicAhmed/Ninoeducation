export type GuideLink = { href: string; ar: string; en: string };

export const GUIDE_LINKS: Record<string, GuideLink> = {
  chooseSchool: {
    href: "/guides/how-to-choose-a-flight-school",
    ar: "كيف تختار أفضل مدرسة طيران",
    en: "How to Choose the Best Flight School",
  },
  pplVsCpl: {
    href: "/guides/ppl-vs-cpl",
    ar: "الفرق بين PPL و CPL",
    en: "PPL vs CPL: What's the Difference",
  },
  visa: {
    href: "/guides/south-africa-study-visa",
    ar: "التأشيرة الدراسية لجنوب أفريقيا",
    en: "South Africa Study Visa Guide",
  },
  cost: {
    href: "/guides/flight-training-cost-south-africa",
    ar: "كم تكلفة تعلم الطيران",
    en: "How Much Flight Training Costs",
  },
  timeline: {
    href: "/guides/how-long-to-become-a-pilot",
    ar: "كم تستغرق دراسة الطيران",
    en: "How Long It Takes to Become a Pilot",
  },
  accommodation: {
    href: "/guides/student-accommodation-south-africa",
    ar: "السكن في جنوب أفريقيا",
    en: "Student Accommodation in South Africa",
  },
  tips: {
    href: "/guides/tips-to-succeed-in-south-africa",
    ar: "نصائح للنجاح في دراسة الطيران",
    en: "Tips to Succeed in Flight Training",
  },
  challenges: {
    href: "/guides/common-challenges-flight-training",
    ar: "مشاكل قد تواجهك أثناء التدريب",
    en: "Common Challenges During Training",
  },
};
