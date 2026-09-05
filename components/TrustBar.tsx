import { ShieldCheck, Globe2, Wallet, Building2 } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    label: "مدارس معتمدة من SACAA",
    sub: "هيئة الطيران المدني الجنوب أفريقية",
  },
  {
    icon: Globe2,
    label: "رخصة معتمدة من ICAO",
    sub: "قابلة للتحويل عالميًا",
  },
  {
    icon: Building2,
    label: "+30 مدرسة شريكة",
    sub: "في جميع أنحاء جنوب أفريقيا",
  },
  {
    icon: Wallet,
    label: "0 رسوم على الطالب",
    sub: "الخدمة مجانية بالكامل",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-nino-line bg-nino-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nino-orange/10 text-nino-orange">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-nino-ink">{b.label}</div>
                  <div className="text-xs text-nino-ink/50">{b.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
