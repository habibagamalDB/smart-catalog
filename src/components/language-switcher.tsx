"use client";

import { LanguagesIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const pathname = usePathname();
  const target =
    routing.locales.find((candidate) => candidate !== locale) ??
    routing.defaultLocale;

  return (
    <Button asChild variant="outline" className="h-11 px-3">
      <Link
        href={pathname}
        locale={target}
        hrefLang={target}
        aria-label={t("languageSwitcher")}
      >
        <LanguagesIcon data-icon="inline-start" aria-hidden />
        <span lang={target}>{t("otherLanguage")}</span>
      </Link>
    </Button>
  );
}
