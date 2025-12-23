'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

interface MapSectionProps {
    // Google Maps embed URL or coordinates
    embedUrl?: string;
}

const MapSection = ({
    embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.6777826285066!2d39.17243!3d21.54238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDMyJzMyLjYiTiAzOcKwMTAnMjAuNyJF!5e0!3m2!1sen!2ssa!4v1234567890"
}: MapSectionProps) => {
    const t = useTranslations('MapSection');
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const map = mapRef.current;

        gsap.fromTo(title,
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

        gsap.fromTo(map,
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1, scale: 1, duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-20 lg:py-32 bg-background" id="location">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <h2
                    ref={titleRef}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-foreground"
                >
                    {t('title')}
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                    {t('subtitle')}
                </p>

                {/* Map Container */}
                <div
                    ref={mapRef}
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                >
                    <iframe
                        src={embedUrl}
                        width="100%"
                        height="500"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                        title="موقع فن المظلات"
                    />

                    {/* Overlay Info Card */}
                    <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-sm bg-card rounded-xl p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-card-foreground mb-2">
                            {t('card.title')}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            {t('card.address')}
                        </p>
                        <a
                            href="https://maps.google.com/?q=21.54238,39.17243"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                        >
                            {t('card.getDirections')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
