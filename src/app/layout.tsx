import "@/app/theme/global.css";
import type { Metadata } from "next";
import Head from "next/head";
import { robotoMono } from "./theme/fonts";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";
// import { serverStyleSheet } from "css-template-components/server";
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
  // const serverStyles = serverStyleSheet.getStyleTags(); // Collect all server-side styles
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
