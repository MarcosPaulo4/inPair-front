import type { Metadata } from "next";
import { AuthProvider } from "./contexts/auth-context";
import CoreProvider from "./contexts/core-provider";
import ThemeRegistry from "./styles/ThemRegistry";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <body>
        <CoreProvider>
          <AuthProvider>
            <ThemeRegistry>
              {children}
            </ThemeRegistry>
          </AuthProvider>

        </CoreProvider>

      </body>
    </html>
  );
}
