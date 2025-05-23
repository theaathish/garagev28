"use client";

import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
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

        {/* Simple Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              GARAGE V28
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Chennai's trusted luxury pre-owned car dealership
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/Collection"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Browse Cars
              </a>
              <a
                href="/Contact"
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Simple animated background */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute left-1/2 top-1/3 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 blur-3xl opacity-20" />
          <div className="absolute right-10 bottom-10 w-40 h-40 rounded-full bg-white blur-2xl opacity-10" />
        </div>
      </div>
    </>
  );
}
