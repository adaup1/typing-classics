import type { Metadata } from "next";
import { robotoMono } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Typing Classics",
  description: "Type along to your favorite public-domain books!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} antialiased`}>{children}</body>
    </html>
  );
}
