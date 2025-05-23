import Link from "next/link";
import Image from "next/image";

export default function SellYourCar() {
  return (
    <section className="py-20 px-6 md:px-20 bg-white text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT TEXT AREA */}
        <div>
          <h2 className="text-4xl font-bold mb-4">PLANNING TO SELL?</h2>
          <p className="text-3xl text-gray-600 mb-8 font-medium">
            SELL US YOUR CAR <br />{" "}
            <span className="font-bold text-black">IN 29 MINUTES.</span>
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <Feature icon={<span>%</span>} title="Outright" subtitle="Sale" />
            <Feature
              icon={<span>&#128337;</span>}
              title="Best Offer"
              subtitle="in 29 Minutes"
            />
            <Feature
              icon={<span>&#128100;</span>}
              title="7600+ Satisfied"
              subtitle="Customers"
            />
            <Feature
              icon={<span>&#9996;&#65039;</span>}
              title="Hassle Free"
              subtitle="Processing"
            />
          </div>

          {/* Know More Button */}
          <button className="border border-gray-400 px-6 py-3 rounded-md flex items-center gap-3 hover:bg-black hover:text-white transition">
            <Link href="/Selling" className="tracking-widest font-semibold">
              KNOW MORE
            </Link>
            <span>&rarr;</span>
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/selling_home.jpg"
            alt="Sell Your Car"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}

// Reusable Feature Box
function Feature({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="p-4 border rounded-lg flex items-start gap-4 bg-white">
      <div className="text-xl text-black">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="font-bold text-md">{subtitle}</p>
      </div>
    </div>
  );
}
