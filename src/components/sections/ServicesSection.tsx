'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { Car, Shield, Home, Building2 } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface Service {
    key: string;
    icon: React.ReactNode;
    gradient: string;
}

const services: Service[] = [
    {
        key: 'carShades',
        icon: <Car className="w-10 h-10" />,
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        key: 'screens',
        icon: <Shield className="w-10 h-10" />,
        gradient: 'from-green-500 to-emerald-500',
    },
    {
        key: 'pergolas',
        icon: <Home className="w-10 h-10" />,
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        key: 'hangars',
        icon: <Building2 className="w-10 h-10" />,
        gradient: 'from-orange-500 to-red-500',
    },
];

const ServicesSection = () => {
    const t = useTranslations('ServicesSection');
    const locale = useLocale();
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const cards = cardsRef.current?.children;

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

        if (cards) {
            gsap.fromTo(cards,
                { opacity: 0, y: 60, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.6,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 60%',
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
        <section ref={sectionRef} className="py-20 lg:py-32 bg-muted/30" id="services">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <h2
                    ref={titleRef}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-foreground"
                >
                    {t('title')}
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
                    {t('subtitle')}
                </p>

                <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <Link
                            key={service.key}
                            href={`/${locale}/services/${service.key}`}
                            className="group relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {service.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                                {t(`services.${service.key}.title`)}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {t(`services.${service.key}.description`)}
                            </p>

                            {/* Arrow */}
                            <div className="mt-6 flex items-center text-primary font-medium text-sm">
                                <span>{t('learnMore')}</span>
                                <svg
                                    className={`w-4 h-4 ${locale === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
