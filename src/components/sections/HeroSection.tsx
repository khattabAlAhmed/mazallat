'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

interface HeroSectionProps {
    youtubeVideoId?: string; // YouTube video ID (e.g., "dQw4w9WgXcQ")
}

const HeroSection = ({ youtubeVideoId = "vcu2xyCyqps" }: HeroSectionProps) => {
    const t = useTranslations('HeroSection');
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Animate overlay fade
        tl.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        );

        // Animate title
        tl.fromTo(titleRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 },
            '-=0.5'
        );

        // Animate subtitle
        tl.fromTo(subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.6'
        );

        // Animate buttons
        tl.fromTo(buttonsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.4'
        );
    }, []);

    return (
        <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-gray-900">
            {/* YouTube Video Background */}
            {youtubeVideoId ? (
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <iframe
                        className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2"
                        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                        title="Background Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : (
                /* Fallback gradient background */
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-800 to-blue-900" />
            )}

            {/* Overlays */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                }} />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto text-center">
                        {/* Main Headline */}
                        <h1
                            ref={titleRef}
                            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
                            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
                        >
                            {t('title')}
                        </h1>

                        {/* Subtitle */}
                        <p
                            ref={subtitleRef}
                            className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
                            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
                        >
                            {t('subtitle')}
                        </p>

                        {/* CTA Buttons */}
                        <div
                            ref={buttonsRef}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            {/* WhatsApp Button */}
                            <Link
                                href="https://wa.me/966500000000?text=مرحباً، أريد الاستفسار عن خدماتكم"
                                target="_blank"
                                className="group relative px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl min-w-[240px] inline-flex items-center justify-center gap-3"
                            >
                                <FaWhatsapp className="w-6 h-6" />
                                <span>{t('buttons.whatsapp')}</span>
                            </Link>

                            {/* Quote Button */}
                            <Link
                                href="#contact"
                                className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl min-w-[240px] inline-flex items-center justify-center"
                            >
                                <span>{t('buttons.quote')}</span>
                            </Link>

                            {/* Call Button */}
                            <Link
                                href="tel:+966500000000"
                                className="group relative px-8 py-4 bg-primary hover:bg-primary/80 text-white rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl min-w-[240px] inline-flex items-center justify-center gap-3"
                            >
                                <FaPhone className="w-5 h-5" />
                                <span>{t('buttons.call')}</span>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✓</span>
                                <span className="text-sm md:text-base">{t('badges.guarantee')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✓</span>
                                <span className="text-sm md:text-base">{t('badges.quality')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✓</span>
                                <span className="text-sm md:text-base">{t('badges.speed')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
                </div>
            </div>

            {/* Decorative Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-primary to-blue-500 z-30" />
        </section>
    );
};

export default HeroSection;