"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [sort, setSort] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/cms-filters")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.brands);
        setStyles(data.styles);
      });
  }, []);

  const handleBrowse = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedBrand) params.set("brand", selectedBrand);
    if (selectedStyle) params.set("style", selectedStyle);
    if (sort) params.set("sort", sort);
    router.push(`/Collection?${params.toString()}`);
  };

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: "url('images/browse.jpg')" }}
    >
      <div className="bg-black/60 absolute inset-0 z-0" />
      <div className="z-10 px-4 sm:px-8 md:px-20 max-w-4xl text-white w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          LET&apos;S KEEP IT SIMPLE.
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          We are the best when it comes to{" "}
          <span className="text-orange-400">Exotic Cars.</span>
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleBrowse();
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cars"
              className="bg-transparent border-b border-gray-400 outline-none text-lg py-2 flex-1 placeholder-gray-300"
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-2">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-white/10 px-3 py-1 rounded text-sm text-white min-w-[120px]"
            >
              <option value="">Brand</option>
              {brands.filter(Boolean).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="bg-white/10 px-3 py-1 rounded text-sm text-white min-w-[120px]"
            >
              <option value="">Style</option>
              {styles.filter(Boolean).map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white/10 px-3 py-1 rounded text-sm text-white min-w-[120px]"
            >
              <option value="">Sort</option>
              <option value="price_asc">Price ↑</option>
              <option value="price_desc">Price ↓</option>
              <option value="year_desc">Year ↓</option>
              <option value="year_asc">Year ↑</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md uppercase tracking-widest font-semibold"
              type="submit"
            >
              Browse Collection
            </button>
            <button
              type="button"
              className="border border-white hover:bg-white hover:text-black p-3 rounded-md transition"
              onClick={() => {
                setSearch("");
                setSelectedBrand("");
                setSelectedStyle("");
                setSort("");
                router.push("/Collection");
              }}
              aria-label="Clear filters"
            >
              <span>&#9776;</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
