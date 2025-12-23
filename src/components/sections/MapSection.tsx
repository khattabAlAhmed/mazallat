'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface MapSectionProps {
    embedUrl?: string;
}

const MapSection = ({
    embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.6777826285066!2d39.17243!3d21.54238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDMyJzMyLjYiTiAzOcKwMTAnMjAuNyJF!5e0!3m2!1sen!2ssa!4v1234567890"
}: MapSectionProps) => {
    const t = useTranslations('MapSection');
    const locale = useLocale();
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;

        gsap.fromTo(headerRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo(mapRef.current,
            { opacity: 0, y: 30, scale: 0.98 },
            {
                opacity: 1, y: 0, scale: 1, duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 65%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="section-padding bg-muted/30 relative overflow-hidden" id="location">
            {/* Decorative */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full mb-6">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-red-500">{locale === 'ar' ? 'موقعنا' : 'Our Location'}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Map Container */}
                <div ref={mapRef} className="relative">
                    {/* Map Frame */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-card">
                        <iframe
                            src={embedUrl}
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full"
                            title={locale === 'ar' ? 'موقع فن المظلات' : 'Fan Al-Mazallat Location'}
                        />
                    </div>

                    {/* Info Card */}
                    <div className="absolute bottom-4 left-4 right-4 md:right-auto md:left-6 md:bottom-6 md:max-w-sm bg-card rounded-2xl p-4 md:p-6 shadow-2xl border border-border">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white">
                                <MapPin className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-card-foreground mb-1">
                                    {t('card.title')}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-3 truncate">
                                    {t('card.address')}
                                </p>
                                <Link
                                    href="https://maps.google.com/?q=21.54238,39.17243"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300"
                                >
                                    <Navigation className="w-4 h-4" />
                                    {t('card.getDirections')}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-cyan-500 rounded-full opacity-20 blur-xl" />
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-secondary to-orange-500 rounded-full opacity-20 blur-xl" />
                </div>
            </div>
        </section>
    );
};

export default MapSection;
