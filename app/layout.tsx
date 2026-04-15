import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cannabis Capital Solutions | SET Ventures",
  description: "Hard money lending, merchant cash advances, equipment financing, and real estate lending for licensed cannabis operators in Canada and the United States.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
