import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MedDash — СЗТ и поликлиника",
  description: "Аналитика для руководства: актив ЦСЗ, ГОБМП/ОСМС, маркеры, нагрузка врачей",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="font-sans antialiased">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 min-h-0 overflow-y-auto p-6 bg-gray-50 flex flex-col">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
