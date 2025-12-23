'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
    youtubeVideoId?: string;
}

const HeroSection = ({ youtubeVideoId = "" }: HeroSectionProps) => {
    const t = useTranslations('HeroSection');
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const badgesRef = useRef<HTMLDivElement>(null);
    const decorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(decorRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.2 }
        );

        tl.fromTo(titleRef.current,
            { opacity: 0, y: 60, clipPath: 'inset(100% 0% 0% 0%)' },
            { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1 },
            '-=0.8'
        );

        tl.fromTo(subtitleRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.5'
        );

        tl.fromTo(buttonsRef.current?.children || [],
            { opacity: 0, y: 30, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
            '-=0.4'
        );

        tl.fromTo(badgesRef.current?.children || [],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
            '-=0.2'
        );
    }, []);

    const scrollToNext = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <section className="relative w-full min-h-screen overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
                {/* Animated Mesh */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-400/30 via-transparent to-transparent" />
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-400/30 via-transparent to-transparent" />
                </div>
            </div>

            {/* YouTube Video Background */}
            {youtubeVideoId && (
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <iframe
                        className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2"
                        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                        title="Background Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/80" />
                </div>
            )}

            {/* Decorative Elements */}
            <div ref={decorRef} className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Shapes */}
                <div className="absolute top-20 left-10 w-20 h-20 md:w-32 md:h-32 border border-cyan-400/20 rounded-full animate-pulse" />
                <div className="absolute top-40 right-20 w-16 h-16 md:w-24 md:h-24 border border-emerald-400/20 rounded-xl rotate-45 animate-bounce" style={{ animationDuration: '3s' }} />
                <div className="absolute bottom-40 left-20 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 rounded-lg rotate-12" />
                <div className="absolute bottom-20 right-10 w-24 h-24 md:w-40 md:h-40 border-2 border-orange-400/10 rounded-full" />

                {/* Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center pt-20">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto text-center">
                        {/* Main Headline */}
                        <h1
                            ref={titleRef}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
                        >
                            <span className="block">{t('title').split('..')[0]}..</span>
                            <span className="text-gradient bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                {t('title').split('..')[1]}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            ref={subtitleRef}
                            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed px-4"
                        >
                            {t('subtitle')}
                        </p>

                        {/* CTA Buttons */}
                        <div
                            ref={buttonsRef}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
                        >
                            {/* WhatsApp Button */}
                            <Link
                                href="https://wa.me/966538256520?text=مرحباً، أريد الاستفسار عن خدماتكم"
                                target="_blank"
                                className="w-full sm:w-auto group relative px-6 sm:px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] flex items-center justify-center gap-3"
                            >
                                <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
                                <span>{t('buttons.whatsapp')}</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </Link>

                            {/* Quote Button */}
                            <Link
                                href="#contact"
                                className="w-full sm:w-auto group relative px-6 sm:px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] flex items-center justify-center"
                            >
                                <span>{t('buttons.quote')}</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </Link>

                            {/* Call Button */}
                            <Link
                                href="tel:+966534395103"
                                className="w-full sm:w-auto group relative px-6 sm:px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:bg-white hover:text-slate-900 hover:scale-105 flex items-center justify-center gap-3"
                            >
                                <FaPhone className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>{t('buttons.call')}</span>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div ref={badgesRef} className="mt-12 sm:mt-16 flex flex-wrap justify-center items-center gap-4 sm:gap-8 px-4">
                            {['guarantee', 'quality', 'speed'].map((badge) => (
                                <div key={badge} className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 flex items-center justify-center text-xs sm:text-sm font-bold text-slate-900">
                                        ✓
                                    </div>
                                    <span className="text-white/90 text-xs sm:text-sm font-medium">{t(`badges.${badge}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={scrollToNext}
                className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
                <span className="text-xs sm:text-sm hidden sm:block">اكتشف المزيد</span>
                <div className="w-8 h-12 sm:w-10 sm:h-14 border-2 border-current rounded-full flex justify-center pt-2">
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                </div>
            </button>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
    );
};

export default HeroSection;