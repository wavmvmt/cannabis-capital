import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cannabis Capital Solutions | SET Ventures",
  description: "Hard money lending, merchant cash advances, equipment financing, and real estate lending for licensed cannabis operators in Canada and the United States.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Cannabis Capital Solutions | SET Ventures",
    description: "Hard money lending, merchant cash advances, equipment financing, and real estate lending for licensed cannabis operators.",
    siteName: "SET Ventures",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cannabis Capital Solutions | SET Ventures",
    description: "Capital solutions for licensed cannabis operators in Canada and the United States.",
  },
};

export default function CannabisCapitalLayout({ children }: { children: React.ReactNode }) {
  return children;
}

