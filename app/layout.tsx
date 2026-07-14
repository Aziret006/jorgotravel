import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Varela_Round, Montserrat } from "next/font/google";

import { Providers } from "@/components/jorgo/providers";
import "./globals.css";

const varelaRound = Varela_Round({
  variable: "--font-varela",
  weight: "400",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JorgoTravel — Туры по Кыргызстану | Горы, озёра и настоящие эмоции",
  description:
    "JorgoTravel — авторские туры по Кыргызстану: горные и треккинг-туры, поездки к озёрам Иссык-Куль и Сон-Куль, джип-экспедиции, конные и культурно-исторические маршруты с опытными гидами.",
  keywords: [
    "туры по Кыргызстану",
    "JorgoTravel",
    "треккинг Кыргызстан",
    "Иссык-Куль",
    "Сон-Куль",
    "джип-туры",
    "конные туры",
    "горнолыжные туры",
  ],
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "JorgoTravel — Туры по Кыргызстану",
    description:
      "Откройте Кыргызстан вместе с JorgoTravel — страной свободы, гор и настоящих эмоций.",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/logo.png", alt: "JorgoTravel" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1BAE82",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${varelaRound.variable} ${montserrat.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
