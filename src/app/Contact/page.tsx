"use client";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Image from "next/image";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setStatus(result.result || result.error);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("Error submitting the form.");
    }
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
            "@type": "ContactPage",
            name: "Contact Garage V28",
            description:
              "Contact Garage V28 for luxury car sales and support in Chennai.",
            url: "https://garagev28.com/Contact",
          }),
        }}
      />

      <div className="bg-gray-100 text-gray-900 min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-[320px] flex items-center justify-center bg-black">
          <Image
            src="/images/browse.jpg"
            alt="Contact Garage V28"
            fill
            className="object-cover opacity-40"
            priority
            style={{ zIndex: 0 }}
          />
          <div className="relative top-15 z-10 max-w-2xl mx-auto px-6 py-16 text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
              Contact <span className="text-red-500">Garage V28</span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-2 max-w-xl mx-auto drop-shadow">
              We&apos;re here to help. Reach out for any inquiries, feedback, or
              assistance.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="max-w-5xl mx-auto mt-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full p-3 border rounded text-black"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="w-full p-3 border rounded text-black"
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                className="w-full p-3 border rounded text-black"
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button
                className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition"
                type="submit"
              >
                Submit
              </button>
            </form>
            {status && (
              <p className="mt-4 text-sm text-center text-black">{status}</p>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="flex flex-col gap-8 justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-2 text-black">
                Contact Details
              </h3>
              <p className="mb-1 text-black">
                <span className="font-semibold">Phone/WhatsApp:</span>{" "}
                <a
                  href="tel:+918124447744"
                  className="text-blue-600 font-semibold"
                >
                  +91 8124447744
                </a>
              </p>
              <p className="mb-1 text-black">
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:info@garagev28.com"
                  className="text-blue-600 font-semibold"
                >
                  info@garagev28.com
                </a>
              </p>
              <p className="mb-1 text-black">
                <span className="font-semibold">Address:</span> Kundrathur,
                Chennai, TamilNadu
              </p>
              <p className="text-black">Open: Mon-Sat, 10am - 7pm</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                title="Garage V28 Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.152830145705!2d80.0782109!3d12.9715986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f57fd4e4b4f7%3A0xd1df0a90b97f6f!2sKundrathur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </>
  );
}
