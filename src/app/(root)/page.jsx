import AllProducts from "@/components/home/AllProducts";
import Banner from "@/components/home/Banner";
import CustomerReviews from "@/components/home/CustomerReviews";
import FeaturedCategories from "@/components/home/FeaturedCategorie";
import TopSellingProducts from "@/components/home/TopSellingProducts";
import VideoSection from "@/components/home/VideoSection";
import TrustBadges from "@/components/common/TrustBadges";

export default function HomePage() {
  return (
    <>
      <Banner />
      <FeaturedCategories />
      <TopSellingProducts />
      <AllProducts />
      <VideoSection />
      <CustomerReviews />
      <TrustBadges />
    </>
  );
}
