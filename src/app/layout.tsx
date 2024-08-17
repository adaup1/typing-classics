import type { Metadata } from "next";
import { anonymousPro } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Typing Classics",
  description: "Type along to your favorite public-domain books!",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${anonymousPro.className} antialiased`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
