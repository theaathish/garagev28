"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "../Components/Navbar";

// Dynamically import heavy components to reduce initial bundle
const Hero = dynamic(() => import("../Components/Hero"), { ssr: false });
const HomeBrowse = dynamic(() => import("../Components/HomeBrowse"), { ssr: false });
const HomeSell = dynamic(() => import("../Components/HomeSell"), { ssr: false });
const HomeTrend = dynamic(() => import("../Components/HomeTrend"), { ssr: false });
const HomeHOW = dynamic(() => import("../Components/HomeHOW"), { ssr: false });
const Footer = dynamic(() => import("../Components/Footer"), { ssr: false });
const HomeFollow = dynamic(() => import("../Components/HomeFollow"), { ssr: false });

// Lazy load framer-motion
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            name: "Garage V28",
            image: "https://garagev28.com/images/legacy-bannerimg.jpg",
            url: "https://garagev28.com/",
            telephone: "+91 8124447744",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kundrathur",
              addressLocality: "Chennai",
              addressRegion: "Tamil Nadu",
              postalCode: "",
              addressCountry: "IN",
            },
            openingHours: "Mo-Sa 10:00-19:00",
            priceRange: "INR",
            areaServed: "Chennai",
          }),
        }}
      />

      <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
        <Navbar />
        <Hero />

        {/* Sections below Hero */}
        <div className="flex flex-col gap-8 px-4 md:px-16 mt-12 z-10">
          <HomeBrowse />
        </div>

        <div className="flex flex-col mt-12 z-10">
          <HomeSell />
          <HomeTrend />
          <HomeHOW />
          <HomeFollow />
        </div>

        <Footer />

        {/* Decorative animated background elements */}
        {MotionDiv && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="pointer-events-none fixed inset-0 z-0"
          >
            <div className="absolute left-1/2 top-1/3 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 blur-3xl opacity-30 animate-pulse" />
            <div className="absolute right-10 bottom-10 w-40 h-40 rounded-full bg-white blur-2xl opacity-10 animate-pulse" />
          </MotionDiv>
        )}
      </div>
    </>
  );
}
