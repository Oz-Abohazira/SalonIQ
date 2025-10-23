import React from 'react'
import Hero from '../components/Hero'
import ServiceMenu from '../components/ServiceMenu'
import PopularServices from '../components/PopularServices'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Hero />
      <ServiceMenu />
      <PopularServices />
      <Banner />
    </div>
  )
}

export default Home