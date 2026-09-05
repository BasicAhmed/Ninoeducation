import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-nino-ink text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-12 text-sm">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg text-white">نينو إديوكيشن</p>
            <p className="mt-2 max-w-xs">
              نساعد الطلاب العرب على الدراسة والتدرب ليصبحوا طيارين في جنوب
              أفريقيا، دون أي رسوم على الطالب.
            </p>
          </div>
          <div>
            <p className="font-medium text-white">روابط</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/schools" className="hover:text-nino-orange">
                  مدارس الطيران
                </Link>
              </li>
              <li>
                <Link href="/accommodation" className="hover:text-nino-orange">
                  السكن الطلابي
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-nino-orange">
                  التقديم
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-white">تواصل معنا</p>
            <a
              href="https://wa.me/000000000000"
              className="mt-2 inline-block hover:text-nino-orange"
            >
              واتساب نينو إديوكيشن
            </a>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} نينو إديوكيشن. جميع الأسعار تقديرية
          وقابلة للتغيير من قبل مدارس الطيران.
        </p>
      </div>
    </footer>
  );
}
