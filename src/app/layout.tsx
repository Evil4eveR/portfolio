import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yassin Marmoud | Software Engineer & EDI Specialist",
  description: "Results-driven Software Engineer and EDI Integration Specialist with 3+ years of experience in backend development, system integration, and technical support. Based in Wolfsburg, Germany.",
  keywords: ["Software Engineer", "EDI Specialist", "Backend Developer", "Python", "Java", "Go", "TypeScript", "Vue.js", "Wolfsburg", "Germany"],
  authors: [{ name: "Yassin Marmoud" }],
  icons: {
    icon: "/profile.png",
  },
  openGraph: {
    title: "Yassin Marmoud | Software Engineer",
    description: "Software Engineer & EDI Integration Specialist based in Germany",
    url: "https://yassin-marmoud.dev",
    siteName: "Yassin Marmoud Portfolio",
    type: "website",
    images: ["/profile.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yassin Marmoud | Software Engineer",
    description: "Software Engineer & EDI Integration Specialist based in Germany",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
