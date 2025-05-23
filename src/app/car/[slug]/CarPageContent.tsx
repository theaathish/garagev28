"use client";
import Image from "next/image";
import Footer from "../../Components/Footer";
import FixNav from "../../Components/FixNav";
import { useState } from "react";
import { urlFor } from "../../../sanity/lib/image";
import type { CarType } from "../../../sanity/schemaTypes/car";

export default function CarPageContent({ car }: { car: CarType }) {
  const [showInquiry, setShowInquiry] = useState(false);
  const [showReserve, setShowReserve] = useState(false);

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <FixNav />

      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{car.Car_name}</h1>
            <p className="text-gray-700 mt-1">
              {car.brand} | {car.style}
            </p>
            <p className="text-2xl font-semibold text-red-600 mt-2">
              ₹ {car.Car_price}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <button
              className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-white"
              onClick={() => setShowInquiry(true)}
            >
              Inquries
            </button>
            <button
              className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800"
              onClick={() => setShowReserve(true)}
            >
              Reserve This Car
            </button>
          </div>
        </div>
        <CarImageSlideshow car={car} />
        <h2 className="text-2xl font-bold mb-4">Car Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 bg-white p-6 rounded-lg shadow-sm text-sm">
          <SummaryItem label="Reg. State" value={car.Reg_state} />
          <SummaryItem label="Vehicle Type" value={car.style} />
          <SummaryItem label="Registration Year" value={car.Reg_yr} />
          <SummaryItem label="Engine" value={car.Engine} />
          <SummaryItem label="Transmission" value={car.Transmission} />
          <SummaryItem label="Ownership" value={car.OwnerShip} />
          <SummaryItem label="Peak Torque" value={car.Peak_torque} />
          <SummaryItem label="Peak Power" value={car.Peak_power} />
          <SummaryItem label="Doors" value={car.Doors} />
          <SummaryItem label="Seating" value={car.SeatingCapacity} />
          <SummaryItem label="Fuel Type" value={car.Fuel_type} />
          <SummaryItem label="Color" value={car.Color} />
          <SummaryItem label="KMS Done" value={car.KMS} />
          <SummaryItem label="Manufacturing Year" value={car.Mfg_yr} />
          <SummaryItem label="Drive Type" value={car.DriveSys} />
        </div>
      </div>

      <InquiryModal
        show={showInquiry}
        onClose={() => setShowInquiry(false)}
        carName={car.Car_name}
      />
      <ReserveModal show={showReserve} onClose={() => setShowReserve(false)} />
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}

function InquiryModal({
  show,
  onClose,
  carName,
}: {
  show: boolean;
  onClose: () => void;
  carName: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  if (!show) return null;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    const fullMessage = `Car: ${carName}\n${formData.message}`;

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.contact,
          message: fullMessage,
        }),
      });

      const result = await res.json();
      setStatus(result.result || result.error);
      setFormData({ name: "", contact: "", message: "" });
    } catch {
      setStatus("Error submitting the form.");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Car Inquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="contact"
              placeholder="Email or Mobile"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <textarea
              className="w-full p-2 border rounded"
              name="message"
              placeholder="Your Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
              type="submit"
            >
              Submit
            </button>
          </form>
          {status && (
            <p className="mt-4 text-sm text-center text-gray-700">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function CarImageSlideshow({ car }: { car: CarType }) {
  const images: Array<{ asset?: { _ref: string } }> = [];
  if (car.IMG_front && car.IMG_front.asset?._ref) {
    images.push(car.IMG_front);
  }
  if (Array.isArray(car.Img_arr)) {
    car.Img_arr.forEach((img) => {
      if (img && img.asset?._ref) images.push(img);
    });
  }

  if (images.length === 0) {
    return (
      <div className="flex justify-center p-2 bg-gray-50 rounded mb-10">
        <div className="w-[400px] h-[260px] flex items-center justify-center bg-gray-200 text-gray-400 rounded border">
          No Image
        </div>
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto gap-4 p-2 bg-gray-50 rounded mb-10">
      {images.map((img, idx) => (
        <Image
          key={(img.asset?._ref || "no-ref") + idx}
          src={urlFor(img as { asset: { _ref: string } })
            .width(400)
            .height(260)
            .url()}
          alt={`Car image ${idx + 1}`}
          width={400}
          height={260}
          className="w-[400px] h-[260px] object-cover border rounded flex-shrink-0"
        />
      ))}
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <div className="flex flex-col items-start">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-black font-semibold">{value || "—"}</span>
    </div>
  );
}

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
    </div>
  );
}
