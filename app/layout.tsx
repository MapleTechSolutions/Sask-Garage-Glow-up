import type { Metadata } from "next";
import { PHONE } from "@/lib/contact";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://saskgarageglow.ca"),
  title: "Sask Garage Glow-Up | Garage Cleanout Regina SK",
  description:
    `Professional garage cleanout, deep clean, and junk hauling in Regina, SK. Same-day service. 100% local. Call ${PHONE}.`,
  openGraph: {
    title: "Sask Garage Glow-Up | Garage Cleanout & Organization Regina SK",
    description: `Professional garage cleanout, deep clean, and junk hauling in Regina, SK. Same-day service. 100% local. Call ${PHONE}.`,
    url: "https://saskgarageglow.ca",
    siteName: "Sask Garage Glow-Up",
    locale: "en_CA",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Sask Garage Glow-Up",
  "url": "https://saskgarageglow.ca",
  "telephone": "+13069421617",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Regina",
    "addressRegion": "SK",
    "addressCountry": "CA"
  },
  "areaServed": [
    { "@type": "City", "name": "Regina" },
    { "@type": "City", "name": "White City" },
    { "@type": "City", "name": "Emerald Park" },
    { "@type": "City", "name": "Pilot Butte" }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans text-text bg-bg antialiased">
        <main>{children}</main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
