// filepath: /Users/user/Workspace/Projects/garagev28/src/app/Components/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowHero(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Swipe down animation overlay */}
      <AnimatePresence>
        {!showHero && (
          <motion.div
            initial={{ y: "-100%", opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: "100%",
              opacity: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-black to-transparent"
          />
        )}
      </AnimatePresence>

      {/* Hero Section with fullscreen video */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        animate={showHero ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center justify-center min-h-screen w-full pt-0"
      >
        {/* Video container */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          {/* Video element - improved for iOS/Android/low-end compatibility */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/hero-fallback.jpg"
            className="w-full h-full object-cover"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            webkit-playsinline="true"
            x5-playsinline="true"
            x-webkit-airplay="allow"
          >
            {/* H.264/AAC for iOS, WebM for Android/modern browsers */}
            <source src="video/hero.mp4" type="video/mp4" />
            <source src="video/hero1.mp4" type="video/mp4" />
            {/* Fallback image for unsupported devices */}
            Sorry, your browser does not support embedded videos.
          </video>
          {/* Fallback image absolutely positioned under video for non-supporting devices */}
          <Image
            src="/images/hero-fallback.jpg"
            alt="Garage V28"
            width={1920}
            height={1080}
            className="w-full h-full object-cover absolute inset-0 z-[-1]"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
            aria-hidden="true"
            draggable={false}
            priority={false}
          />

          {/* Animated scroll arrow */}
          <div
            className="absolute left-1/2 bottom-10 z-20 flex flex-col items-center pointer-events-none"
            style={{ transform: "translateX(-50%)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [0, 16, 24, 32],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.3, 0.7, 1],
              }}
              className="flex flex-col items-center"
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path
                  d="M18 10v16M18 26l-6-6M18 26l6-6"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
        </div>

        {/* Hero content */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full min-h-screen px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={showHero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-4xl md:text-5xl font-extrabold mt-10 text-center drop-shadow-lg"
            style={{ textShadow: "0 4px 32px #000" }}
          >
            Experience the <span className="text-blue-400">Future</span> of
            Automotive Luxury
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={showHero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-300 text-lg md:text-xl mt-6 text-center max-w-2xl"
            style={{ textShadow: "0 2px 12px #000" }}
          >
            Discover the next generation of performance, design, and technology.
            Welcome to Garage V28.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={showHero ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <a
              href="/Collection"
              className="px-8 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg shadow-lg transition"
            >
              Explore
            </a>
            <a
              href="/contact"
              className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-lg shadow-lg border border-white/20 transition"
            >
              Contact
            </a>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
