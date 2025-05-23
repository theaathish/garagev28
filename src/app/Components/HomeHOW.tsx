import Image from "next/image";

const steps = [
  {
    title: "BROWSE FROM OUR COLLECTION",
    image: "/images/howitworks-img1.png",
  },
  {
    title: "GET TO KNOW YOUR RIDE",
    image: "/images/howitworks-img2.png",
  },
  {
    title: "PAY & BOOK ONLINE OR VISIT SHOWROOM",
    image: "/images/howitworks-img3.png",
  },
  {
    title: "INSTANT PAYMENT & TRANSFER",
    image: "/images/howitworks-img4.png",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-24 text-center">
      <h2 className="text-4xl font-bold mb-4">HOW IT WORKS</h2>
      <p className="text-gray-400 mb-12 max-w-3xl mx-auto">
        Buying used luxury cars in India was never this easy. You can now own
        your dream luxury car in just 4 simple steps at Big Boy Toyz,
        India&apos;s trusted used car portal.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center bg-black-900 rounded-xl p-6 h-full ${
              index % 2 === 1 ? "lg:flex-col-reverse" : ""
            }`}
          >
            <Image
              src={step.image}
              alt={step.title}
              width={150}
              height={150}
              className="mb-6"
            />
            <p className="font-semibold tracking-widest underline underline-offset-4 mt-4">
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
