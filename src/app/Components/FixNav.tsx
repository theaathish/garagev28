"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/Collection", label: "Collection" },
  { href: "/Selling", label: "Sell Your Car" },
  { href: "/About", label: "About" },
  { href: "/Contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavClick = () => setOpen(false);

  return (
    <>
      <nav className="stricky bg-black top-0 left-0 w-full z-[60] flex items-center justify-between py-3 px-6 md:px-12">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={handleNavClick}
            className="flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="Garage V28"
              width={110}
              height={40}
              priority
              className="invert"
              style={{ filter: "invert(1)" }}
            />
          </Link>
        </div>

        {/* End desktop menu */}
        <button
          className="text-white text-2xl focus:outline-none"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          &#9776;
        </button>
      </nav>
      {/* Mobile/Desktop Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex flex-col items-center justify-start pt-12 overflow-y-auto">
          <div className="w-full flex justify-between items-center px-8 mb-8">
            <Link
              href="/"
              onClick={handleNavClick}
              className="flex items-center gap-2"
            >
              <Image
                src="/logo.png"
                alt="Garage V28"
                width={100}
                height={36}
                className="invert"
                style={{ filter: "invert(1)" }}
              />
            </Link>
            <button
              className="text-white text-4xl"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>
          <div className="w-full border-t border-gray-700 mb-8" />
          <nav className="flex flex-col gap-8 items-center w-full">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-2xl font-bold hover:text-red-500 transition"
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
