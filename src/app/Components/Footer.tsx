"use client";
import React from "react";

export default function Footer() {
  const handleNav = (url: string) => {
    window.location.href = url;
  };

  return (
    <footer className="bg-black text-white pt-16 pb-10 px-6 md:px-20 text-sm">
      {/* Top Menu Sections */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-gray-800 pb-10">
        {/* BBT World */}
        <div>
          <h3 className="font-semibold mb-3">GARAGE V28</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <button
                className="hover:underline"
                onClick={() => handleNav("/WhyUs")}
                type="button"
              >
                Why Us
              </button>
            </li>
            <li>
              <button
                className="hover:underline"
                onClick={() => handleNav("/About")}
                type="button"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                className="hover:underline"
                onClick={() => handleNav("/Team")}
                type="button"
              >
                The Team
              </button>
            </li>
          </ul>
        </div>

        {/* General */}
        <div>
          <h3 className="font-semibold mb-3">GENERAL</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <button
                className="hover:underline"
                onClick={() => handleNav("/Selling")}
                type="button"
              >
                Sell Car
              </button>
            </li>
            <li>
              <button
                className="hover:underline"
                onClick={() => handleNav("/Collection")}
                type="button"
              >
                Buy Car
              </button>
            </li>
            <li>
              <button
                className="hover:underline"
                onClick={() => handleNav("/Reviews")}
                type="button"
              >
                Reviews
              </button>
            </li>
          </ul>
        </div>

        {/* Brands */}
        <div className="col-span-2">
          <h3 className="font-semibold mb-3">BRANDS</h3>
          <div className="grid grid-cols-3 gap-4 text-gray-400 text-xs">
            {[
              "Used Audi",
              "Used BMW",
              "Used Bentley",
              "Used Ferrari",
              "Used Jaguar",
              "Used Lamborghini",
              "Used Land Rover",
              "Used Mercedes-Benz",
              "Used Porsche",
              "Used Rolls-Royce",
              "Used Tesla",
              "Used Toyota",
              "Used Volkswagen",
              "Used Volvo",
              "Used Mini",
              "Used Lexus",
              "Used Nissan",
              "Used Hyundai",
              "Used Ford",
              "Used Jeep",
              "Used Skoda",
              "Used MG",
              "Used KIA",
              "Used Mahindra",
            ].map((brand, i) => (
              <button
                key={i}
                className="mb-2 block hover:underline text-left"
                type="button"
                onClick={() =>
                  handleNav(
                    `/Collection?brand=${encodeURIComponent(brand.replace("Used ", ""))}`,
                  )
                }
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Style */}
        <div>
          <h3 className="font-semibold mb-3">STYLE</h3>
          <ul className="space-y-2 text-gray-400">
            {[
              "SUV",
              "Sedan",
              "Convertible",
              "Coupe",
              "Sports",
              "MUV-MPV",
              "Hatchback",
            ].map((style) => (
              <li key={style}>
                <button
                  className="hover:underline"
                  type="button"
                  onClick={() =>
                    handleNav(`/Collection?style=${encodeURIComponent(style)}`)
                  }
                >
                  Used {style}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 text-gray-400">
        <div>
          <h4 className="text-white font-semibold mb-2">Garage</h4>
          <p>Kundrathur, Chennai Tamilnadu, India</p>
        </div>
      </div>

      {/* Phones Section */}
      <div className="mt-10 flex flex-col sm:flex-row gap-6 sm:gap-20 text-gray-400">
        <div>
          <h5 className="text-white font-semibold">Buy Car</h5>
          <p>(+91) 8124447744</p>
        </div>
        <div>
          <h5 className="text-white font-semibold">Sell Your Car</h5>
          <p>(+91) 8124447744</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-gray-500 text-xs flex flex-col md:flex-row justify-between items-center">
        <p>
          Copyright © 2025{" "}
          <span className="font-bold text-white">Garage V28</span> |
          <span className="ml-2">
            Privacy Policy | Cancellation & Refund | Terms of Use | Site Map
          </span>
        </p>
        <p className="mt-2 md:mt-0">Website Designed by Strucureo</p>
      </div>
    </footer>
  );
}
