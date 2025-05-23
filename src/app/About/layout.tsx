import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Garage V28 | Luxury Car Dealer in Chennai',
  description: 'Learn about Garage V28, Chennai\'s trusted luxury pre-owned car dealership. Our mission, milestones, and customer reviews.',
  keywords: 'about garage v28, luxury car dealer chennai, pre-owned cars, car dealership history, customer reviews',
  alternates: {
    canonical: 'https://garagev28.com/About',
  },
  openGraph: {
    title: 'About Garage V28 | Luxury Car Dealer in Chennai',
    description: 'Learn about Garage V28, Chennai\'s trusted luxury pre-owned car dealership.',
    type: 'website',
    url: 'https://garagev28.com/About',
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
    title: 'About Garage V28',
    description: 'Chennai\'s trusted luxury pre-owned car dealership since 2009.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
