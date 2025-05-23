"use client";

import Image from "next/image";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";

export default function About() {
  const [mounted, setMounted] = useState(false);

  const timeline = [
    {
      year: "2009",
      title: "Arrival of the Wavemaker",
      description:
        "Came into being in the year 2009 in the heart of South Delhi.",
    },
    {
      year: "2010–11",
      title: "Extending Spree",
      description: "Spreading its roots and tentacles all over India.",
    },
    {
      year: "2012",
      title: "Numbers Game",
      description:
        "Staunch increase in the number of patrons despite an evident slowdown in the Indian Economy...",
    },
  ];

  type Review = {
    _id: string;
    Car_name?: string;
    Review?: string;
    Name_of_clients?: string;
    image?: string;
  };

  // Remove hardcoded reviews, use state for fetched reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    setMounted(true);

    client
      .fetch(
        `*[_type == "review"] | order(_createdAt desc)[0...20]{
          _id,
          Car_name,
          Review,
          Name_of_clients,
          "image": Img.asset->url
        }`,
      )
      .then((data) => setReviews(data))
      .finally(() => setLoading(false));
  }, []);

  const handleReadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Garage V28",
            description: "Luxury pre-owned car dealer in Chennai.",
            url: "https://garagev28.com/About",
          }),
        }}
      />
      <div className="bg-gray-100 text-gray-900">
        <Navbar />

        {/* Hero Section with background image */}
        <div
          className="relative bg-black text-white py-20 px-6 h-100 text-center"
          style={{
            backgroundImage: "url('/images/legacy-bannerimg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 px-4 py-16">
            <h1 className="text-5xl font-bold mb-4">ABOUT GARAGE V28</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Your journey begins here — where luxury meets trust in the
              pre-owned car space.
            </p>
          </div>
        </div>

        {/* Company Info */}
        <div className="px-6 py-16 max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">
            Garage V28, a pre-owned luxury car dealer with passion and purpose
          </h2>
          <p className="mb-4">
            Garage V28 started as a vision to redefine the luxury used car
            market by delivering unmatched value and service. Our approach is
            simple — combine authenticity, trust, and a love for great cars into
            one brand that puts customers first.
          </p>
          <p>
            Since inception, we’ve focused on building a seamless experience for
            our patrons — you. Whether it’s sourcing top-condition vehicles,
            offering transparent history checks, or ensuring a test drive that
            inspires confidence, everything we do is about you.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white px-6 py-12 text-center">
          <h3 className="text-2xl font-bold mb-2">MISSION</h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            To redefine the global automotive landscape by setting new standards
            of innovation and impact.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="px-6 py-16 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-10 text-center">MILESTONES</h3>
          <div className="grid md:grid-cols-3 gap-10">
            {timeline.map((item) => (
              <div key={item.year} className="bg-white p-6 rounded-xl shadow">
                <h4 className="text-xl font-semibold mb-2">{item.year}</h4>
                <h5 className="text-lg font-medium mb-1">{item.title}</h5>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        {!loading && (
          <div className="bg-white px-6 py-16">
            <h3 className="text-2xl font-bold mb-10 text-center">REVIEWS</h3>
            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {reviews.length === 0 ? (
                <p className="col-span-3 text-center text-gray-500">
                  No reviews found.
                </p>
              ) : (
                reviews.slice(0, visibleCount).map((review, idx) => (
                  <div key={review._id || idx} className="text-center">
                    <div className="rounded-2xl overflow-hidden shadow mb-4">
                      {review.image &&
                      typeof review.image === "string" &&
                      review.image.match(/^https?:\/\//) ? (
                        <Image
                          src={review.image}
                          alt={review.Car_name || "Review Image"}
                          width={400}
                          height={250}
                          className="object-cover w-full h-[250px]"
                        />
                      ) : (
                        <div className="bg-gray-200 w-full h-[250px] flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg font-bold">
                      {review.Car_name || "No Title"}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {review.Review || "No Description"}
                    </p>
                    {review.Name_of_clients && (
                      <p className="text-xs text-gray-500 mt-2">
                        By: {review.Name_of_clients}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
            {/* Read More Button */}
            {visibleCount < reviews.length && (
              <div className="flex justify-center mt-8">
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={handleReadMore}
                >
                  Read More
                </button>
              </div>
            )}
          </div>
        )}
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
