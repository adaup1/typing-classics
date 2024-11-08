import "@/app/theme/global.css";
import type { Metadata } from "next";
import { robotoMono, raleway, nunitoSans } from "./theme/fonts";
import { HeaderNav } from "./HeaderNav";
import Footer from "./Footer";

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
      <body
        className={`${robotoMono.className} ${raleway.className} ${nunitoSans.className} antialiased`}
      >
        <HeaderNav />
        <div className="body-container">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
