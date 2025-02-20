import NavHomeAcc from '../nav/navHomeAcc'
import HomeTop from './HomeTop/HomeTop'
import FlashSalesAcc from './FlashSales/FlashSalesAcc'
import Categories from './Categories/Categories'
import BestSellingAcc from './Best Selling/BestSellingAcc'
import OfferAcc from './Offer/OfferAcc'
import ExploreProductsAcc from './ExploreProducts/ExploreProductsAcc'
import ArrivalAcc from './Arrival/ArrivalAcc'
import Features from './Features/Features'
const HomeAcc = () => {
    return (
        <main id='HomeAcc'>
            <NavHomeAcc />
            <HomeTop />
            <FlashSalesAcc />
            <Categories />
            <BestSellingAcc />
            <OfferAcc />
            <ExploreProductsAcc />
            <ArrivalAcc />
            <Features />
        </main>
    )
}

export default HomeAcc