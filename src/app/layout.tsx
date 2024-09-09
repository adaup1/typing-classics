import "@/app/theme/global.css";
import type { Metadata } from "next";
import { robotoMono } from "./theme/fonts";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";
import { getServerStyles } from "css-template-components/server";

export const metadata: Metadata = {
  title: "Typing Classics",
  description: "Type along to your favorite public-domain books!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serverStyles = getServerStyles();

  return (
    <html lang="en">
      <head>
        <style id="server-styles">{serverStyles}</style>
      </head>
      <body className={`${robotoMono.className} antialiased`}>
        <HeaderNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
