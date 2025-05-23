"use client";

import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import Hero from "../Components/Hero";
import HomeBrowse from "../Components/HomeBrowse";
import HomeSell from "../Components/HomeSell";
// Importing the Hero component
import HomeTrend from "../Components/HomeTrend";
import HomeHOW from "../Components/HomeHOW";
import Footer from "../Components/Footer";
import HomeFollow from "../Components/HomeFollow";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Garage V28 - Luxury Pre-Owned Cars in Chennai</title>
        <meta
          name="description"
          content="Garage V28 is Chennai's trusted luxury car dealership. Buy, sell, and browse premium used cars with confidence."
        />
        <meta
          property="og:title"
          content="Garage V28 - Luxury Pre-Owned Cars in Chennai"
        />
        <meta
          property="og:description"
          content="Buy, sell, and browse premium used cars in Chennai. Trusted, transparent, and customer-first."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://garagev28.com/Home" />
        <meta
          property="og:image"
          content="https://garagev28.com/images/legacy-bannerimg.jpg"
        />
        <link rel="canonical" href="https://garagev28.com/Home" />
        <meta name="application-name" content="Garage V28" />
        <link rel="icon" href="/favicon.ico" />
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
      </Head>
      <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
        <Navbar />
        <Hero />

        {/* Sections below Hero */}
        <div className="flex flex-col gap-8 px-4 md:px-16 mt-12 z-10">
          {/* Browse Collection */}
          <HomeBrowse />
        </div>

        <div className="flex flex-col mt-12 z-10">
          {/* Sell Your Car */}
          <HomeSell />
          {/* Trending Section */}
          <HomeTrend />
          {/* How It Works Section */}
          <HomeHOW />
          {/* From Connection */}
          <HomeFollow />
        </div>

        {/* Footer */}
        <Footer />

        {/* Decorative animated background elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="pointer-events-none fixed inset-0 z-0"
        >
          <div className="absolute left-1/2 top-1/3 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 blur-3xl opacity-30 animate-pulse" />
          <div className="absolute right-10 bottom-10 w-40 h-40 rounded-full bg-white blur-2xl opacity-10 animate-pulse" />
        </motion.div>
      </div>
    </>
  );
}
