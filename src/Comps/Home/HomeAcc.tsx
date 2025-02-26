import NavHomeAcc from '../nav/navHomeAcc'
import HomeTop from './HomeTop/HomeTop'
import FlashSales from './FlashSales/FlashSales'
import Categories from './Categories/Categories'
import BestSelling from './Best Selling/BestSelling'
import Offer from './Offer/Offer'
import ExploreProducts from './ExploreProducts/ExploreProducts'
import Arrival from './Arrival/Arrival'
import Features from './Features/Features'
const HomeAcc = () => {
    return (
        <main id='HomeAcc'>
            <NavHomeAcc />
            <HomeTop />
            <FlashSales />
            <Categories />
            <BestSelling />
            <Offer />
            <ExploreProducts />
            <Arrival />
            <Features />
        </main>
    )
}

export default HomeAcc