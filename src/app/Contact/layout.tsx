import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Garage V28 | Luxury Car Dealer Chennai',
  description: 'Contact Garage V28 for luxury car sales and support in Chennai. Phone, email, and location details.',
  keywords: 'contact garage v28, luxury car dealer chennai, car dealership contact, kundrathur cars',
  alternates: {
    canonical: 'https://garagev28.com/Contact',
  },
  openGraph: {
    title: 'Contact Garage V28 | Luxury Car Dealer Chennai',
    description: 'Contact Garage V28 for luxury car sales and support in Chennai.',
    type: 'website',
    url: 'https://garagev28.com/Contact',
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
    title: 'Contact Garage V28',
    description: 'Get in touch with Chennai\'s trusted luxury car dealer.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
