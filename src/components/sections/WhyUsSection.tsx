'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { Shield, Users, Clock, Wallet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
    key: string;
    icon: React.ReactNode;
    color: string;
}

const features: Feature[] = [
    {
        key: 'materials',
        icon: <Shield className="w-8 h-8" />,
        color: 'bg-blue-500',
    },
    {
        key: 'supervision',
        icon: <Users className="w-8 h-8" />,
        color: 'bg-green-500',
    },
    {
        key: 'speed',
        icon: <Clock className="w-8 h-8" />,
        color: 'bg-orange-500',
    },
    {
        key: 'pricing',
        icon: <Wallet className="w-8 h-8" />,
        color: 'bg-purple-500',
    },
];

const WhyUsSection = () => {
    const t = useTranslations('WhyUsSection');
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
                { opacity: 0, y: 40, rotateY: -15 },
                {
                    opacity: 1, y: 0, rotateY: 0, duration: 0.6,
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
        <section ref={sectionRef} className="py-20 lg:py-32 bg-muted/30" id="why-us">
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
                    {features.map((feature) => (
                        <div
                            key={feature.key}
                            className="relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center group"
                        >
                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-card-foreground mb-3">
                                {t(`features.${feature.key}.title`)}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {t(`features.${feature.key}.description`)}
                            </p>

                            {/* Checkmark */}
                            <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                                ✓
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUsSection;
