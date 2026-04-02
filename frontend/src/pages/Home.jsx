import React from "react";
import Navbar from "../components/common/Navbar";
import Announcement from "../components/common/Announcement";
import Banner from "../components/home/Banner";
import Stats from '../components/home/Stats';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Banner />
      <Stats/>
      <Features/>
      <HowItWorks/>
      <Testimonials/>
    </>
  );
};

export default Home;
