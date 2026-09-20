import { Nunito,Inter } from "next/font/google";
import "./globals.css";
import Navber from "./common/Navber";
import Footer from "./common/Footer";
import MobileBottomNav from "./common/MobileBottomNav";
import { ShopProvider } from "./common/ShopContext";
import VisitTracker from "./common/VisitTracker";




const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "N H Shop",
  description: "An e-commerce website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${nunito.variable}`}
      >
        <ShopProvider>
          <VisitTracker />
          <Navber />
          {children}
          <MobileBottomNav />
          <Footer />
        </ShopProvider>

      </body>
    </html>
  );
}
