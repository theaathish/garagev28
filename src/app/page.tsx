import { redirect } from "next/navigation";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Garage V28 - Luxury Pre-Owned Cars in Chennai</title>
        <meta
          name="description"
          content="Buy and sell luxury pre-owned cars in Chennai. Trusted car dealership with the best deals and inventory."
        />
        <link rel="canonical" href="https://garagev28.com/" />
        <meta name="robots" content="index,follow" />
        <meta name="application-name" content="Garage V28" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Garage V28",
              image: "https://garagev28.com/images/legacy-bannerimg.jpg",
              url: "https://garagev28.com/",
              telephone: "+91 8124447744",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kundrathur",
                addressLocality: "Chennai",
                addressRegion: "Tamil Nadu",
                postalCode: "",
                addressCountry: "IN",
              },
              openingHours: "Mo-Sa 10:00-19:00",
              priceRange: "INR",
              areaServed: "Chennai",
            }),
          }}
        />
      </Head>
      {redirect("/Home")}
    </>
  );
}
