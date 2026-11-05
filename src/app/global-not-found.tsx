import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "الصفحة غير موجودة | Page not found",
};

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={plexArabic.variable}>
      <body className="flex min-h-dvh items-center justify-center px-4 antialiased">
        <main className="grid max-w-md gap-8 text-center">
          <section className="grid gap-2">
            <h1 className="text-2xl font-bold">الصفحة غير موجودة</h1>
            <p className="text-muted-foreground">
              الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
            </p>
            <Link className="font-medium text-primary underline" href="/ar">
              العودة للرئيسية
            </Link>
          </section>
          <section lang="en" dir="ltr" className="grid gap-2">
            <h2 className="text-2xl font-bold">Page not found</h2>
            <p className="text-muted-foreground">
              The page you are looking for doesn&apos;t exist or has moved.
            </p>
            <Link className="font-medium text-primary underline" href="/en">
              Back to home
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
