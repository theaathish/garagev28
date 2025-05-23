import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Garage V28 - Luxury Pre-Owned Cars in Chennai',
  description: 'Garage V28 is Chennai\'s trusted luxury car dealership. Buy, sell, and browse premium used cars with confidence.',
  keywords: 'luxury cars Chennai, pre-owned cars, used cars, car dealership, premium cars, second hand cars Chennai',
  alternates: {
    canonical: 'https://garagev28.com/Home',
  },
  openGraph: {
    title: 'Garage V28 - Luxury Pre-Owned Cars in Chennai',
    description: 'Buy, sell, and browse premium used cars in Chennai. Trusted, transparent, and customer-first.',
    type: 'website',
    url: 'https://garagev28.com/Home',
    images: [
      {
        url: 'https://garagev28.com/images/legacy-bannerimg.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Garage V28 - Luxury Pre-Owned Cars in Chennai',
    description: 'Chennai\'s trusted luxury car dealership.',
    images: ['https://garagev28.com/images/legacy-bannerimg.jpg'],
  },
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
