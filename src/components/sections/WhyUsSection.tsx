'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { Shield, Users, Clock, Wallet, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
    key: string;
    icon: React.ReactNode;
    gradient: string;
    bgColor: string;
}

const features: Feature[] = [
    {
        key: 'materials',
        icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />,
        gradient: 'from-cyan-500 to-blue-600',
        bgColor: 'bg-cyan-500/10',
    },
    {
        key: 'supervision',
        icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
        gradient: 'from-emerald-500 to-green-600',
        bgColor: 'bg-emerald-500/10',
    },
    {
        key: 'speed',
        icon: <Clock className="w-6 h-6 md:w-8 md:h-8" />,
        gradient: 'from-orange-500 to-amber-600',
        bgColor: 'bg-orange-500/10',
    },
    {
        key: 'pricing',
        icon: <Wallet className="w-6 h-6 md:w-8 md:h-8" />,
        gradient: 'from-purple-500 to-pink-600',
        bgColor: 'bg-purple-500/10',
    },
];

const WhyUsSection = () => {
    const t = useTranslations('WhyUsSection');
    const locale = useLocale();
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

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

        const cards = cardsRef.current?.children;
        if (cards) {
            gsap.fromTo(cards,
                { opacity: 0, y: 60, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.6,
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="section-padding bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden" id="why-us">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-medium text-emerald-400">{locale === 'ar' ? 'مميزاتنا' : 'Our Advantages'}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Features Grid */}
                <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={feature.key}
                            className="group relative rounded-3xl p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                        >
                            {/* Gradient Glow on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                            {/* Number Badge */}
                            <div className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white/50">
                                0{index + 1}
                            </div>

                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                                {t(`features.${feature.key}.title`)}
                            </h3>
                            <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4">
                                {t(`features.${feature.key}.description`)}
                            </p>

                            {/* Check Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-medium text-emerald-400">{locale === 'ar' ? 'متوفر' : 'Available'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUsSection;
