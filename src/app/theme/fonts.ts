import { Roboto_Mono, Raleway, Nunito_Sans } from "next/font/google";

export const robotoMono = Roboto_Mono({
  subsets: ["latin-ext"],
  weight: ["400"],
});

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});
