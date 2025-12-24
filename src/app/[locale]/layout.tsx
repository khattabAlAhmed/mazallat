import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fan-almizallat.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isArabic = locale === 'ar';

  const title = isArabic
    ? 'فن المظلات | مظلات وسواتر جدة - أفضل أسعار المظلات في السعودية'
    : 'Fan Al-Mazallat | Car Shades & Screens Jeddah - Best Prices in Saudi Arabia';

  const description = isArabic
    ? 'فن المظلات - أفضل شركة مظلات وسواتر في جدة. نقدم مظلات سيارات، سواتر، برجولات، وهناجر بجودة عالية وضمان 10 سنوات. اتصل الآن للحصول على عرض سعر مجاني!'
    : 'Fan Al-Mazallat - Best car shades and screens company in Jeddah. We provide car shades, privacy screens, pergolas, and hangars with high quality and 10-year warranty. Call now for a free quote!';

  const keywords = isArabic
    ? ['مظلات', 'سواتر', 'مظلات سيارات', 'مظلات جدة', 'سواتر جدة', 'برجولات', 'هناجر', 'تركيب مظلات', 'أسعار المظلات', 'فن المظلات', 'مظلات السعودية']
    : ['car shades', 'privacy screens', 'pergolas', 'hangars', 'shading solutions', 'Jeddah shades', 'Saudi Arabia', 'Fan Al-Mazallat', 'awnings'];

  return {
    title: {
      default: title,
      template: isArabic ? '%s | فن المظلات' : '%s | Fan Al-Mazallat',
    },
    description,
    keywords,
    authors: [{ name: isArabic ? 'فن المظلات' : 'Fan Al-Mazallat' }],
    creator: isArabic ? 'فن المظلات' : 'Fan Al-Mazallat',
    publisher: isArabic ? 'فن المظلات' : 'Fan Al-Mazallat',

    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: '/',
      languages: {
        'ar': '/ar',
        'en': '/en',
      },
    },

    openGraph: {
      type: 'website',
      locale: isArabic ? 'ar_SA' : 'en_US',
      alternateLocale: isArabic ? 'en_US' : 'ar_SA',
      url: siteUrl,
      siteName: isArabic ? 'فن المظلات' : 'Fan Al-Mazallat',
      title,
      description,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isArabic ? 'فن المظلات - مظلات وسواتر جدة' : 'Fan Al-Mazallat - Shades & Screens Jeddah',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
      creator: '@fanalmizallat',
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    verification: {
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },

    category: isArabic ? 'خدمات' : 'Services',
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const fontClass = 'font-sans';

  // JSON-LD Schema for Local Business
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: locale === 'ar' ? 'فن المظلات' : 'Fan Al-Mazallat',
    description: locale === 'ar'
      ? 'شركة متخصصة في تركيب المظلات والسواتر والبرجولات والهناجر في جدة'
      : 'Specialized company in installing shades, screens, pergolas and hangars in Jeddah',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    telephone: '+966538256520',
    email: 'info@fan-almizallat.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: locale === 'ar' ? 'جدة' : 'Jeddah',
      addressCountry: 'SA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.342717,
      longitude: 39.005156,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '18:00',
    },
    priceRange: '$$',
    sameAs: [
      'https://instagram.com/fanalmizallat',
      'https://twitter.com/fanalmizallat',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'ar' ? 'خدماتنا' : 'Our Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'ar' ? 'مظلات السيارات' : 'Car Shades',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'ar' ? 'السواتر' : 'Privacy Screens',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'ar' ? 'البرجولات' : 'Pergolas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'ar' ? 'الهناجر' : 'Hangars',
          },
        },
      ],
    },
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${fontClass} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
