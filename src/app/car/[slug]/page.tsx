import { client } from "../../../sanity/lib/client";
import type { CarType } from "../../../sanity/schemaTypes/car";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car: CarType = await client.fetch(
    `*[_type == "car" && slug.current == $slug][0]{
      ...,
      "hashtags": hashtags[]->name
    }`,
    { slug },
  );

  if (!car) {
    return {
      title: "Car Not Found | Garage V28",
      description: "The car you're looking for was not found.",
    };
  }

  const url = `https://garagev28.com/car/${car.slug?.current ?? ""}`;
  const imgUrl = car.IMG_front ? car.IMG_front.asset?.url || "" : "";
  
  // Create dynamic keywords from hashtags and car details
  const dynamicKeywords = [
    car.Car_name,
    car.brand,
    car.style,
    `${car.year} ${car.brand}`,
    `${car.Car_name} for sale`,
    `${car.brand} ${car.style}`,
    'used car Chennai',
    'pre-owned car',
    'luxury car Chennai',
    ...(car.hashtags || [])
  ].filter(Boolean);

  const dynamicDescription = `Buy ${car.Car_name} (${car.year}) in Chennai. ${car.brand} ${car.style} available at Garage V28. Price: ${car.Car_price}. Features: ${car.fuel_type}, ${car.transmission}. Contact us for test drive.`;

  return {
    title: `${car.Car_name} for Sale in Chennai | Garage V28`,
    description: dynamicDescription,
    keywords: dynamicKeywords.join(', '),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${car.Car_name} for Sale in Chennai | Garage V28`,
      description: dynamicDescription,
      type: "website",
      url: url,
      images: imgUrl ? [{ 
        url: imgUrl,
        width: 1200,
        height: 630,
        alt: `${car.Car_name} - ${car.brand} ${car.style}`
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${car.Car_name} for Sale`,
      description: `${car.brand} ${car.style} (${car.year}) - ${car.Car_price}`,
      images: imgUrl ? [imgUrl] : [],
    },
    other: {
      'article:author': 'Garage V28',
      'article:publisher': 'Garage V28',
    }
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const car: CarType = await client.fetch(
    `*[_type == "car" && slug.current == $slug][0]{
      ...,
      "hashtags": hashtags[]->name
    }`,
    { slug },
  );

  if (!car) return <div>Car not found</div>;

  const CarPageContent = (await import("./CarPageContent")).default;

  const url = `https://garagev28.com/car/${car.slug?.current ?? ""}`;
  const imgUrl = car.IMG_front ? car.IMG_front.asset?.url || "" : "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: car.Car_name,
            image: imgUrl,
            description: `${car.Car_name} - ${car.brand} ${car.style} (${car.year})`,
            brand: {
              "@type": "Brand",
              name: car.brand
            },
            category: car.style,
            sku: car._id,
            vehicleEngine: {
              "@type": "EngineSpecification",
              fuelType: car.fuel_type
            },
            vehicleTransmission: car.transmission,
            vehicleModelDate: car.year,
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: car.Car_price_num,
              availability: "https://schema.org/InStock",
              url: url,
              seller: {
                "@type": "AutoDealer",
                name: "Garage V28"
              }
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.5",
              reviewCount: "50"
            }
          }),
        }}
      />
      <CarPageContent car={car} />
    </>
  );
}
