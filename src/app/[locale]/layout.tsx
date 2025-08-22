import { routing } from "@/i18n/routing";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { AlertProvider } from "../components/Alert/useAlertProvider";
import { AuthProvider } from "../contexts/auth-context";
import CoreProvider from "../contexts/core-provider";
import ThemeRegistry from "../styles/ThemRegistry";

export const metadata: Metadata = {
  title: "InPair",
  description: "A private social network",
  alternates: {
    languages: {
      pt: "/pt",
      en: "/en",
    },
  },
  openGraph: {
    url: "https://inPair.com",
    siteName: "InPair",
    description:
      "A private social network",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <CoreProvider>
          <AppRouterCacheProvider>
            <ThemeRegistry>
              <AuthProvider>
                <NextIntlClientProvider locale={locale}>
                  <AlertProvider>
                    {children}
                  </AlertProvider>
                </NextIntlClientProvider>
              </AuthProvider>
            </ThemeRegistry>
          </AppRouterCacheProvider>
        </CoreProvider>
      </body>
    </html>
  );
}
