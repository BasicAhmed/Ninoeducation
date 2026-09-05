import Image from "next/image";

const routes = [
  { from: "Riyadh", code: "RUH", lat: "24.71°N", lon: "46.68°E" },
  { from: "Cairo", code: "CAI", lat: "30.04°N", lon: "31.24°E" },
  { from: "Dubai", code: "DXB", lat: "25.20°N", lon: "55.27°E" },
  { from: "Mumbai", code: "BOM", lat: "19.09°N", lon: "72.87°E" },
];

const stats = [
  { value: "30+", label: "partner flight schools across South Africa" },
  { value: "R0", label: "fees charged to students, ever" },
  { value: "PPL–ATPL", label: "training pathways covered" },
];

const steps = [
  {
    n: "Compare",
    body: "Filter every partner school by budget, license, aircraft, and location — see real pricing side by side.",
  },
  {
    n: "Apply",
    body: "Submit one application through Nino Education. We route it to the school and follow up on your behalf.",
  },
  {
    n: "Arrive",
    body: "Accommodation, airport pickup, a SIM card, and someone to call in your first week in South Africa.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Nav */}
      <header className="border-b border-nino-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Image
            src="/brand/nino-logo-black.svg"
            alt="Nino Education"
            width={140}
            height={36}
            priority
          />
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#schools" className="hover:text-nino-orange">
              Flight Schools
            </a>
            <a href="#guide" className="hover:text-nino-orange">
              Study Guide
            </a>
            <a href="#how" className="hover:text-nino-orange">
              How It Works
            </a>
          </nav>
          <a
            href="#apply"
            className="rounded-full bg-nino-ink px-5 py-2.5 text-sm font-medium text-nino-white transition hover:bg-nino-orange"
          >
            Apply Now
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-nino-line bg-nino-ink text-nino-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-nino-orange">
              OR Tambo · FAJS · 26.13°S, 28.24°E
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-6xl">
              Your route to
              <br />
              the flight deck
              <br />
              starts here.
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/70">
              Nino Education helps students from the Arab world and India find,
              compare, and apply to flight schools in South Africa — at no
              cost to you.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#schools"
                className="rounded-full bg-nino-orange px-6 py-3 text-sm font-medium text-nino-white hover:bg-white hover:text-nino-ink"
              >
                Find My Flight School
              </a>
              <a
                href="#how"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium hover:border-white"
              >
                How It Works
              </a>
            </div>
          </div>

          {/* Route board */}
          <div className="self-center rounded-2xl border border-white/15 bg-white/[0.04] p-6 font-mono text-sm">
            <div className="mb-4 flex justify-between text-white/40">
              <span>ORIGIN</span>
              <span>DESTINATION</span>
            </div>
            {routes.map((r) => (
              <div
                key={r.code}
                className="flex items-center justify-between border-t border-white/10 py-3 first:border-t-0"
              >
                <div>
                  <div>{r.from}</div>
                  <div className="text-white/40">
                    {r.lat} {r.lon}
                  </div>
                </div>
                <div className="h-px flex-1 mx-4 bg-white/15" />
                <div className="text-nino-orange">JNB</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-nino-line bg-nino-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl text-nino-orange">
                {s.value}
              </div>
              <p className="mt-2 max-w-[24ch] text-sm text-nino-ink/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-b border-nino-line bg-nino-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl md:text-4xl">
            We don&apos;t charge students. Ever.
          </h2>
          <p className="mt-3 max-w-xl text-nino-ink/70">
            Nino Education is paid by our partner flight schools, not by you.
            Here&apos;s what that looks like in practice.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-nino-ink pt-5">
                <h3 className="font-display text-xl">{s.n}</h3>
                <p className="mt-2 text-sm text-nino-ink/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer id="apply" className="bg-nino-ink text-nino-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl">
            Ready to start your file?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Tell us your budget and goals — we&apos;ll match you with schools
            today.
          </p>
          <a
            href="#"
            className="mt-8 inline-block rounded-full bg-nino-orange px-8 py-3 text-sm font-medium hover:bg-white hover:text-nino-ink"
          >
            Start My Application
          </a>
        </div>
      </footer>
    </main>
  );
}
