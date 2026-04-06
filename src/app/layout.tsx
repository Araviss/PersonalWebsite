import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { SwitchShell, BootWrapper } from "@/components/layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio — Switch OS",
  description: "Personal portfolio with a Nintendo Switch-inspired interface.",
};

export const viewport: Viewport = {
  themeColor: "#2D2D2D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-sans">
        <ThemeProvider>
          <BootWrapper>
            <SwitchShell>{children}</SwitchShell>
          </BootWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
