import React from 'react'
import NavHome from '../nav/NavHome'
import NavHomeAcc from '../nav/navHomeAcc'
import AboutTop from './AboutTop/AboutTop'
import Achievement from './achievements/Achievement'
import WorkedBy from './WorkedBy/WorkedBy'
import Features from '../Home/Features/Features'

const About = () => {
    
    return (
        <>
        <AboutTop />
        <Achievement />
        <WorkedBy />
        <Features />
        </>
    )
}

export default About