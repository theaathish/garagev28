import Head from "next/head";
import { client } from "../../../sanity/lib/client";
import type { CarType } from "../../../sanity/schemaTypes/car";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const car: CarType = await client.fetch(
    `*[_type == "car" && slug.current == $slug][0]`,
    { slug },
  );

  if (!car) return <div>Car not found</div>;

  const CarPageContent = (await import("./CarPageContent")).default;

  const url = `https://garagev28.com/car/${car.slug?.current ?? ""}`;
  const imgUrl = car.IMG_front ? car.IMG_front.asset?.url || "" : "";

  return (
    <>
      <Head>
        <title>{car.Car_name} for Sale in Chennai | Garage V28</title>
        <meta
          name="description"
          content={`Buy ${car.Car_name} (${car.year}) in Chennai. Price: ${car.Car_price}.`}
        />
        <link rel="canonical" href={url} />
        <meta
          property="og:title"
          content={`${car.Car_name} for Sale in Chennai | Garage V28`}
        />
        <meta
          property="og:description"
          content={`Buy ${car.Car_name} (${car.year}) in Chennai. Price: ${car.Car_price}.`}
        />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imgUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: car.Car_name,
              image: imgUrl,
              description: car.Car_name,
              brand: car.brand,
              offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: car.Car_price_num,
                availability: "https://schema.org/InStock",
                url: url,
              },
            }),
          }}
        />
      </Head>
      <CarPageContent car={car} />
    </>
  );
}
