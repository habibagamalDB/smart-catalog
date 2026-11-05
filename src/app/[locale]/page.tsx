import {
  BellRingIcon,
  CakeSliceIcon,
  LayoutDashboardIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";

const features = [
  { key: "catalog", Icon: CakeSliceIcon },
  { key: "ordering", Icon: ShoppingBagIcon },
  { key: "dashboard", Icon: LayoutDashboardIcon },
  { key: "telegram", Icon: BellRingIcon },
] as const;

export default function HomePage() {
  const t = useTranslations("Home");
  const common = useTranslations("Common");

  return (
    <>
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <span className="font-heading text-lg font-semibold">
            {common("appName")}
          </span>
          <LanguageSwitcher />
        </div>
      </header>

      <main id="main" className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
          <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
          <h1 className="mt-3 max-w-3xl font-heading text-3xl leading-tight font-bold text-balance sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>

          <h2 className="mt-12 text-xl font-semibold">{t("featuresTitle")}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {features.map(({ key, Icon }) => (
              <li
                key={key}
                className="flex items-start gap-3 rounded-xl border bg-card p-4 text-card-foreground"
              >
                <Icon
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  aria-hidden
                />
                <span>{t(`features.${key}`)}</span>
              </li>
            ))}
          </ul>

          <p
            role="status"
            className="mt-10 rounded-lg bg-secondary px-4 py-3 text-sm text-secondary-foreground"
          >
            {t("status")}
          </p>
        </section>
      </main>
    </>
  );
}
