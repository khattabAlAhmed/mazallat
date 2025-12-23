'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { Car, Shield, Home, Building2, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface Service {
    key: string;
    icon: React.ReactNode;
    gradient: string;
    bgPattern: string;
}

const services: Service[] = [
    {
        key: 'carShades',
        icon: <Car className="w-8 h-8 md:w-10 md:h-10" />,
        gradient: 'from-cyan-500 to-blue-600',
        bgPattern: 'bg-cyan-500/5',
    },
    {
        key: 'screens',
        icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
        gradient: 'from-emerald-500 to-green-600',
        bgPattern: 'bg-emerald-500/5',
    },
    {
        key: 'pergolas',
        icon: <Home className="w-8 h-8 md:w-10 md:h-10" />,
        gradient: 'from-purple-500 to-pink-600',
        bgPattern: 'bg-purple-500/5',
    },
    {
        key: 'hangars',
        icon: <Building2 className="w-8 h-8 md:w-10 md:h-10" />,
        gradient: 'from-orange-500 to-red-600',
        bgPattern: 'bg-orange-500/5',
    },
];

const ServicesSection = () => {
    const t = useTranslations('ServicesSection');
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
                { opacity: 0, y: 80, rotateX: -15 },
                {
                    opacity: 1, y: 0, rotateX: 0, duration: 0.7,
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

    const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

    return (
        <section ref={sectionRef} className="section-padding bg-muted/30 relative overflow-hidden" id="services">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-50">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm font-medium text-primary">{locale === 'ar' ? 'خدماتنا' : 'Our Services'}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Services Grid */}
                <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {services.map((service) => (
                        <Link
                            key={service.key}
                            href={`#contact`}
                            className={`group relative rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-3 ${service.bgPattern} bg-card border border-border hover:border-primary/30 shadow-lg hover:shadow-2xl overflow-hidden`}
                        >
                            {/* Gradient Overlay on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                            {/* Decorative Circle */}
                            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500`} />

                            {/* Icon Container */}
                            <div className={`relative inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${service.gradient} text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                {service.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg md:text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                                {t(`services.${service.key}.title`)}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                                {t(`services.${service.key}.description`)}
                            </p>

                            {/* Arrow Link */}
                            <div className="flex items-center gap-2 text-primary font-medium">
                                <span className="text-sm">{t('learnMore')}</span>
                                <Arrow className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
