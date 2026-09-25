import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nemo12 Outreach Engine",
  description: "Vietnam outreach targets, relationships, pilots and learner outcomes in one operating system.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
