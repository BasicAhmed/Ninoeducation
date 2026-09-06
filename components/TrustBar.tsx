import { ShieldCheck, Globe2, Wallet, Building2 } from "lucide-react";
import { getLang } from "@/lib/i18n/get-lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

export async function TrustBar() {
  const lang = await getLang();
  const t = dictionaries[lang].trustBar;

  const badges = [
    { icon: ShieldCheck, label: t.sacaaLabel, sub: t.sacaaSub },
    { icon: Globe2, label: t.icaoLabel, sub: t.icaoSub },
    { icon: Building2, label: t.schoolsLabel, sub: t.schoolsSub },
    { icon: Wallet, label: t.feesLabel, sub: t.feesSub },
  ];

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
