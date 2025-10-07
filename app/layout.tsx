import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BitMind - Stop Deepfake Fraud",
  description: "State-of-the-art deepfake detection API. Protect your business from the $200M+ deepfake crisis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
