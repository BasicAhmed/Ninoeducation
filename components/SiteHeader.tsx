import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  return (
    <header
      className={
        transparent
          ? "absolute inset-x-0 top-0 z-20 bg-transparent"
          : "relative border-b border-nino-line bg-nino-cream"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/">
          <Image
            src="/brand/nino-icon-color.svg"
            alt="نينو إديوكيشن"
            width={40}
            height={40}
            priority
          />
        </Link>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          <Link href="/schools" className="hover:text-nino-orange">
            مدارس الطيران
          </Link>
          <Link href="/accommodation" className="hover:text-nino-orange">
            السكن الطلابي
          </Link>
          <Link href="/quiz" className="hover:text-nino-orange">
            ابحث عن مدرستي
          </Link>
          <Link href="/calculator" className="hover:text-nino-orange">
            حاسبة التكلفة
          </Link>
        </nav>
        <Link
          href="/apply"
          className="rounded-full bg-nino-ink px-5 py-2.5 text-sm font-medium text-nino-white transition hover:bg-nino-orange"
        >
          قدّم الآن
        </Link>
      </div>
    </header>
  );
}
