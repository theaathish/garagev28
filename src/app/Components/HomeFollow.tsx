// components/FromBBTWorld.tsx

import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    title: "",
    image: "/images/selling_home.jpg", // Replace with actual image path
    link: "/About",
  },
];

export default function FromBBTWorld() {
  return (
    <section className="py-10 px-2 sm:px-4 text-center bg-white text-black">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10">
        FROM THE GARAGE V28
      </h2>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
        {cards.map(({ title, image, link }) => (
          <Link
            key={title + link}
            href={link}
            className="w-full sm:w-[380px] max-w-xs"
          >
            <div className="rounded-3xl overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105 w-full h-64 sm:h-96 relative bg-gray-100 flex-shrink-0">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 380px"
              />
              <div className="absolute bottom-4 left-4 text-black text-base sm:text-xl font-semibold bg-white/80 px-3 py-1 rounded">
                {title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
