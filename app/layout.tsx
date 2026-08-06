import type { Metadata } from "next";
import { Inter, Roboto, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { GatewayProvider } from "@/lib/gateway-context";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-gemini" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-claude" });

export const metadata: Metadata = {
  title: "NetCost.ai — Wholesale AI Pricing",
  description: "Route your organization through a single metered AI gateway.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${roboto.variable} ${sourceSerif.variable}`}>
      <body className="bg-background text-foreground font-sans">
        <GatewayProvider>
          {children}
          <SiteFooter />
        </GatewayProvider>
      </body>
    </html>
  );
}