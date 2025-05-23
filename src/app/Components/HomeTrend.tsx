"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

// Import your Sanity client
import { createClient } from "next-sanity";
import { urlFor } from "../../sanity/lib/image"; // Add this import

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-01-01",
  useCdn: true,
});

interface Car {
  _id: string;
  Car_name: string;
  Reg_yr: string;
  KMS: string;
  Fuel_type: string;
  IMG_front: {
    asset: {
      url: string;
    };
  };
  treading_position: number;
  slug: string;
  brand: string;
  style: string;
}

export default function TrendingCars() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch trending cars (those with treading_position set, sorted by treading_position)
    client
      .fetch(
        `*[_type == "car" && defined(treading_position)] | order(treading_position asc)[0...10]{
          _id,
          Car_name,
          Reg_yr,
          KMS,
          Fuel_type,
          IMG_front,
          treading_position,
          slug,
          brand,
          style
        }`,
      )
      .then((data) => setCars(data))
      .finally(() => setLoading(false));
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    if (direction === "left") scrollRef.current.scrollLeft -= 300;
    else scrollRef.current.scrollLeft += 300;
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-white text-black relative">
      <h2 className="text-center text-xl tracking-widest text-gray-600 mb-2">
        POPULAR @
      </h2>
      <h1 className="text-center text-4xl font-bold mb-10">BIG BOY TOYZ</h1>

      <div className="relative">
        {/* Scroll Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-r-lg"
        >
          {/* Left chevron Unicode */}
          <span style={{ fontSize: "1.5rem" }}>&#x2039;</span>
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-l-lg"
        >
          {/* Right chevron Unicode */}
          <span style={{ fontSize: "1.5rem" }}>&#x203A;</span>
        </button>

        {/* Car List */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-2"
        >
          {loading ? (
            <div className="text-center w-full py-10">Loading...</div>
          ) : cars.length === 0 ? (
            <div className="text-center w-full py-10">
              No trending cars found.
            </div>
          ) : (
            cars.map((car) => (
              <div
                key={car._id}
                className="min-w-[320px] bg-white rounded-xl shadow-md overflow-hidden"
              >
                {car.IMG_front && car.IMG_front.asset ? (
                  <Image
                    src={urlFor(car.IMG_front).width(500).height(300).url()}
                    alt={car.Car_name}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{car.Car_name}</h3>
                  <p className="text-sm text-gray-600">
                    {car.Reg_yr && (
                      <>
                        REG. YEAR –{" "}
                        <span className="font-semibold text-black">
                          {car.Reg_yr}
                        </span>{" "}
                        |{" "}
                      </>
                    )}
                    KMS –{" "}
                    <span className="font-semibold text-black">{car.KMS}</span>{" "}
                    | FUEL TYPE –{" "}
                    <span className="font-semibold text-black">
                      {car.Fuel_type}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
