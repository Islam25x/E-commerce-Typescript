import React from 'react'
import NavHome from '../nav/NavHome'
import HomeTop from './HomeTop/HomeTop'
import FlashSales from './FlashSales/FlashSales'
import Categories from './Categories/Categories'
import BestSelling from './Best Selling/BestSelling'
import Offer from './Offer/Offer'
import ExploreProducts from './ExploreProducts/ExploreProducts'
import Arrival from './Arrival/Arrival'
import Features from './Features/Features'

const Home = () => {
    return (
        <main id='Home'>
            <NavHome />
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

export default Home