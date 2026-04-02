import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Announcement from "../components/common/Announcement";
import Banner from "../components/home/Banner";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";
import Footer from "../components/common/Footer";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location]);
  return (
    <>
      <Announcement />
      <Navbar />
      <Banner />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
