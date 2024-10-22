import "@/app/theme/global.css";
import type { Metadata } from "next";
import { robotoMono, nunito, raleway, nunitoSans } from "./theme/fonts";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";
import { getServerStyles, styled } from "css-template-components/server";

export const metadata: Metadata = {
  title: "Typing Classics",
  description: "Type along to your favorite public-domain books!",
};

const StyledBodyContainer = styled(
  "div",
  `
  min-height: calc(100vh - 7rem);
`
);

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
      <body
        className={`${robotoMono.className} ${raleway.className} ${nunitoSans.className} antialiased`}
      >
        <HeaderNav />
        <StyledBodyContainer>{children}</StyledBodyContainer>
        <Footer />
      </body>
    </html>
  );
}
