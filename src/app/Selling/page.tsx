"use client";
import Image from "next/image";
import FixNav from "../Components/FixNav";
import Footer from "../Components/Footer";
import Link from "next/link";
import { useState } from "react";

// ReserveModal reused from car slug page
function ReserveModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const phone = "+91 9876543210";
  const email = "info@garagev28.com";

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg max-w-xs w-full p-6 relative flex flex-col items-center">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Garage V28"
            width={80}
            height={32}
            className="mb-2"
          />
          <h2 className="text-lg font-bold mb-2">Reserve This Car</h2>
          <div className="w-full text-center mb-2">
            <p className="text-gray-700 font-medium">Call or WhatsApp:</p>
            <a
              href={`tel:${phone}`}
              className="text-blue-600 font-semibold block"
            >
              {phone}
            </a>
          </div>
          <div className="w-full text-center mb-2">
            <p className="text-gray-700 font-medium">Email:</p>
            <a
              href={`mailto:${email}`}
              className="text-blue-600 font-semibold block"
            >
              {email}
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            We will assist you with your reservation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SellingPage() {
  const [showReserve, setShowReserve] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    carName: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("Submitting...");

    try {
      const res = await fetch("/api/submitCar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          carName: form.carName,
          photoUrl: "",
        }),
      });

      const result = await res.json();
      setSubmitStatus(result.result || result.error);

      if (res.ok) {
        setForm({ name: "", contact: "", carName: "" });
      }
    } catch (error) {
      setSubmitStatus("Error submitting car details");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      {/* Navbar */}
      <FixNav />

      {/* Hero Section */}
      <section className="relative min-h-[420px] flex items-center justify-center bg-black">
        <Image
          src="/images/browse.jpg"
          alt="Sell your car"
          fill
          className="object-cover opacity-40"
          priority
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Sell Your Car with{" "}
            <span className="text-red-500">Garage V28</span>
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow">
            Seamless, transparent, and rewarding. Get the best value for your
            luxury or premium car with our expert team.
          </p>
        </div>
      </section>

      {/* Why Sell With Us */}
      <section className="max-w-6xl mx-auto mt-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Why Sell With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <span className="text-5xl mb-4">🚗</span>
            <h3 className="font-semibold text-xl mb-2 text-black">
              Free Car Evaluation
            </h3>
            <p className="text-black text-center">
              Get a fair, transparent price for your car from our experts. No
              hidden charges.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <span className="text-5xl mb-4">⚡</span>
            <h3 className="font-semibold text-xl mb-2 text-black">
              Quick & Hassle-Free
            </h3>
            <p className="text-black text-center">
              Sell your car in a few easy steps with minimal paperwork and
              instant offers.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <span className="text-5xl mb-4">🔒</span>
            <h3 className="font-semibold text-xl mb-2 text-black">
              Secure Payment
            </h3>
            <p className="text-black text-center">
              Instant payment and complete transparency throughout the process.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto mt-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
            <span className="text-4xl mb-3">📞</span>
            <h4 className="font-semibold text-lg mb-2 text-black">
              1. Contact Us
            </h4>
            <p className="text-black text-center">
              Reach out via phone, WhatsApp, or our contact form to start your
              selling journey.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
            <span className="text-4xl mb-3">📝</span>
            <h4 className="font-semibold text-lg mb-2 text-black">
              2. Get Evaluation
            </h4>
            <p className="text-black text-center">
              Our experts evaluate your car and offer the best price in the
              market.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
            <span className="text-4xl mb-3">💸</span>
            <h4 className="font-semibold text-lg mb-2 text-black">
              3. Sell & Get Paid
            </h4>
            <p className="text-black text-center">
              Complete the paperwork and receive instant payment securely.
            </p>
          </div>
        </div>
      </section>

      {/* Car Submission Form - Add after "How It Works" section */}
      <section className="max-w-2xl mx-auto mt-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Submit Your Car Details
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact (Mobile/Email) *
              </label>
              <input
                type="text"
                placeholder="Mobile number or email address"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Name/Model *
              </label>
              <input
                type="text"
                placeholder="e.g., Honda City 2020, BMW 3 Series"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={form.carName}
                onChange={(e) => setForm({ ...form, carName: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition duration-200"
            >
              {isSubmitting ? "Submitting..." : "Submit Car Details"}
            </button>

            {submitStatus && (
              <div
                className={`text-center p-3 rounded ${
                  submitStatus.includes("Error") || submitStatus.includes("Failed")
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {submitStatus}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto mt-20 mb-24 px-4 text-center">
        <div className="bg-blue-600 rounded-xl py-12 px-6 shadow-lg flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Sell Your Car?
          </h2>
          <p className="text-lg text-blue-100 mb-6">
            Get a free evaluation and sell your car with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-white text-blue-700 px-8 py-3 rounded font-semibold hover:bg-blue-100 transition text-lg"
              onClick={() => setShowReserve(true)}
            >
              Start Now
            </button>
            <Link href="/Contact">
              <button className="bg-red-600 text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition text-lg">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      <ReserveModal show={showReserve} onClose={() => setShowReserve(false)} />
      {/* Footer */}
      <Footer />
    </div>
  );
}
