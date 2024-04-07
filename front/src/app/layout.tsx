import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "@/src/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Нарушениям.Нет",
  description: "ИС для помощи полиции по своевременной фиксации нарушений правил дорожного движения"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}><Providers>{children}</Providers></body>
    </html>
  );
}
