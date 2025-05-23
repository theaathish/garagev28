import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import FixNav from "../Components/FixNav";
import Footer from "../Components/Footer";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import SearchBar from "./SearchBarClient";
import type { CarType } from "../../sanity/schemaTypes/car";

function getQueryParams(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const get = (key: string) =>
    typeof searchParams[key] === "string" ? searchParams[key] : "";
  return {
    search: get("search"),
    brand: get("brand"),
    style: get("style"),
    minPrice: get("minPrice"),
    maxPrice: get("maxPrice"),
    minYear: get("minYear"),
    maxYear: get("maxYear"),
    sort: get("sort"),
    page: parseInt(get("page") || "1", 10),
  };
}

export default async function CollectionPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const {
    search,
    brand,
    style,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    sort,
    page,
  } = getQueryParams(resolvedSearchParams || {});

  // Build GROQ filter
  let filter = '*[_type == "car"';
  const conditions: string[] = [];
  if (search) {
    conditions.push(`Car_name match "*${search}*"`);
  }
  if (brand) {
    conditions.push(`brand == "${brand}"`);
  }
  if (style) {
    conditions.push(`style == "${style}"`);
  }
  if (minPrice) {
    conditions.push(`Car_price_num >= ${parseInt(minPrice)}`);
  }
  if (maxPrice) {
    conditions.push(`Car_price_num <= ${parseInt(maxPrice)}`);
  }
  if (minYear) {
    conditions.push(`year >= ${parseInt(minYear)}`);
  }
  if (maxYear) {
    conditions.push(`year <= ${parseInt(maxYear)}`);
  }
  if (conditions.length) {
    filter += " && " + conditions.join(" && ");
  }
  filter += "]";

  // Sorting
  let sortQuery = "";
  if (sort === "price_asc") sortQuery = "| order(Car_price_num asc)";
  else if (sort === "price_desc") sortQuery = "| order(Car_price_num desc)";
  else if (sort === "year_desc") sortQuery = "| order(year desc)";
  else if (sort === "year_asc") sortQuery = "| order(year asc)";
  else sortQuery = "| order(_createdAt desc)";
  filter += ` ${sortQuery}`;

  // Pagination
  const carsPerPage = 20;
  const currentPage = Math.max(page || 1, 1);
  const start = (currentPage - 1) * carsPerPage;
  const end = start + carsPerPage;
  const pagedFilter = `${filter}[${start}...${end}]`;

  // Fetch cars and total count
  const [cars, total]: [CarType[], number] = await Promise.all([
    client.fetch(pagedFilter),
    client.fetch(`count(${filter})`),
  ]);
  const brands = await client.fetch('array::unique(*[_type == "car"].brand)');
  const styles = await client.fetch('array::unique(*[_type == "car"].style)');

  const totalPages = Math.ceil(total / carsPerPage);

  return (
    <>
      <Head>
        <title>Browse Used Cars in Chennai | Garage V28</title>
        <meta
          name="description"
          content="Explore our curated collection of luxury pre-owned cars for sale in Chennai. Find your next car at Garage V28."
        />
        <link rel="canonical" href="https://garagev28.com/Collection" />
        <meta
          property="og:title"
          content="Browse Used Cars in Chennai | Garage V28"
        />
        <meta
          property="og:description"
          content="Explore our curated collection of luxury pre-owned cars for sale in Chennai."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://garagev28.com/Collection" />
        <meta
          property="og:image"
          content="https://garagev28.com/images/legacy-bannerimg.jpg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Garage V28 Car Collection",
              description: "Luxury pre-owned cars for sale in Chennai.",
              url: "https://garagev28.com/Collection",
            }),
          }}
        />
      </Head>
      <div className="bg-gray-100 text-gray-900 min-h-screen">
        {/* Navbar */}
        <FixNav />

        {/* Attractive & Simple Filters */}
        <div className="max-w-6xl mx-auto px-4 pt-4 pb-2">
          <SearchBar
            search={search}
            brand={brand}
            style={style}
            sort={sort}
            brands={brands}
            styles={styles}
          />
        </div>

        {/* Car Grid */}
        <div className="max-w-6xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Browse Collection
          </h1>
          {/* Page List */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mb-6">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cars.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No cars found.
              </div>
            )}
            {cars.map((car: CarType) => (
              <Link
                key={car._id}
                href={`/car/${car.slug?.current ?? ""}`}
                className="border rounded-2xl overflow-hidden bg-white hover:shadow-2xl transition flex flex-col group relative"
              >
                <div className="flex justify-center p-2 bg-gray-50 relative">
                  {car.IMG_front && car.IMG_front.asset?._ref ? (
                    <Image
                      src={urlFor(car.IMG_front).width(320).height(200).url()}
                      alt={car.Car_name}
                      width={320}
                      height={200}
                      className="w-[320px] h-[200px] object-cover border rounded-lg transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      quality={80}
                      priority={false}
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  ) : (
                    <div className="w-[320px] h-[200px] flex items-center justify-center bg-gray-200 text-gray-400 rounded-lg border">
                      No Image
                    </div>
                  )}
                  <span className="absolute top-2 right-2 bg-white/80 text-xs px-2 py-1 rounded font-semibold text-gray-700 shadow">
                    {car.year || "Year"}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold mb-1 text-gray-900">
                    {car.Car_name}
                  </h2>
                  <p className="text-lg font-semibold text-red-600 mb-1">
                    {car.Car_price}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-2">
                    <span>{car.brand}</span>
                    <span>•</span>
                    <span>{car.style}</span>
                  </div>
                  <div className="flex-1"></div>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {car.fuel_type || "Fuel"}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {car.transmission || "Transmission"}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-blue-500 opacity-0 group-hover:opacity-100 transition"></div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const params = new URLSearchParams({
                  ...resolvedSearchParams,
                  page: pageNum.toString(),
                }).toString();
                return (
                  <Link
                    key={pageNum}
                    href={`?${params}`}
                    className={`px-4 py-2 rounded border font-semibold ${
                      pageNum === currentPage
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
