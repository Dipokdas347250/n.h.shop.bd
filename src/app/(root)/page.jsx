import AllProducts from '@/components/home/AllProducts'
import Banner from '@/components/home/Banner'
import CustomerReviews from '@/components/home/CustomerReviews'
import FeaturedCategories from '@/components/home/FeaturedCategorie'
import TopSellingProducts from '@/components/home/TopSellingProducts'
import React from 'react'



const page = () => {
  return (
    
     <>
     <Banner/>
     <FeaturedCategories/>
     <TopSellingProducts/>
     <AllProducts/>
     <CustomerReviews/>
     
    

     </>
    
  )
}

export default page
