import { Nunito, Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navber from "./common/Navber";
import Footer from "./common/Footer";
import MobileBottomNav from "./common/MobileBottomNav";
import { ShopProvider } from "./common/ShopContext";
import VisitTracker from "./common/VisitTracker";
import { StoreCatalogProvider } from "./common/StoreCatalogContext";
import { StoreAuthProvider } from "./common/StoreAuthContext";
import { StoreSettingsProvider } from "./common/StoreSettingsContext";
import { LanguageProvider } from "./common/LanguageContext";
import MetaPixel from "./common/MetaPixel";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Bangla script support, so Bangla copy renders properly rather than as boxes.
const hindSiliguri = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "N H Shop | এন এইচ শপ",
  description: "Quality products delivered across Bangladesh. সারা বাংলাদেশে মানসম্মত পণ্য।",
};

export default function RootLayout({ children }) {
  // `lang` starts at the default and LanguageProvider updates it once the
  // visitor's saved choice is known.
  return (
    <html lang="bn">
      <body className={`${inter.variable} ${nunito.variable} ${hindSiliguri.variable} font-sans antialiased`}>
        <LanguageProvider>
          <StoreAuthProvider>
            <MetaPixel />
            <StoreSettingsProvider>
              <StoreCatalogProvider>
                <ShopProvider>
                  <VisitTracker />
                  <Navber />
                  <main className="min-h-[60vh] pb-24 md:pb-0">{children}</main>
                  <MobileBottomNav />
                  <Footer />
                </ShopProvider>
              </StoreCatalogProvider>
            </StoreSettingsProvider>
          </StoreAuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
