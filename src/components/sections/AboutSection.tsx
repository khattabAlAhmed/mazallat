'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { Award, Users, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
    imageSrc?: string; // Path to the about image
}

const AboutSection = ({ imageSrc = "/about.jpeg" }: AboutSectionProps) => {
    const t = useTranslations('AboutSection');
    const locale = useLocale();
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;

        gsap.fromTo(contentRef.current,
            { opacity: 0, x: locale === 'ar' ? 60 : -60 },
            {
                opacity: 1, x: 0, duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo(imageRef.current,
            { opacity: 0, x: locale === 'ar' ? -60 : 60, scale: 0.9 },
            {
                opacity: 1, x: 0, scale: 1, duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        const statItems = statsRef.current?.children;
        if (statItems) {
            gsap.fromTo(statItems,
                { opacity: 0, y: 40, scale: 0.8 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.6,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [locale]);

    const stats = [
        { icon: Award, value: '+500', labelKey: 'projects', color: 'from-cyan-500 to-blue-500' },
        { icon: Users, value: '10+', labelKey: 'years', color: 'from-emerald-500 to-green-500' },
        { icon: ThumbsUp, value: '100%', labelKey: 'satisfaction', color: 'from-orange-500 to-amber-500' },
    ];

    return (
        <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden" id="about">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Content */}
                    <div ref={contentRef} className="order-2 lg:order-1">
                        {/* Section Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-sm font-medium text-primary">{t('title')}</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                            {t('subtitle')}
                            <span className="block mt-2 text-gradient bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                                {locale === 'ar' ? 'خبراء التظليل' : 'Shading Experts'}
                            </span>
                        </h2>

                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                            {t('paragraph1')}
                        </p>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                            {t('paragraph2')}
                        </p>

                        {/* Stats Grid */}
                        <div ref={statsRef} className="grid grid-cols-3 gap-3 md:gap-6">
                            {stats.map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={stat.labelKey}
                                        className="relative group p-4 md:p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center overflow-hidden"
                                    >
                                        {/* Gradient Border Effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                        <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-3`}>
                                            <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs md:text-sm text-muted-foreground">
                                            {t(`stats.${stat.labelKey}`)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Image */}
                    <div ref={imageRef} className="order-1 lg:order-2">
                        <div className="relative">
                            {/* Main Image Container */}
                            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src={imageSrc}
                                    alt={locale === 'ar' ? 'فن المظلات' : 'Fan Al-Mazallat'}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />

                                {/* Subtle gradient overlay for aesthetics */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-card px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-xl border border-border">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-lg md:text-xl font-bold">
                                        ✓
                                    </div>
                                    <div>
                                        <div className="text-lg md:text-xl font-bold text-foreground">10</div>
                                        <div className="text-xs md:text-sm text-muted-foreground">{locale === 'ar' ? 'سنوات ضمان' : 'Years Warranty'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -left-4 w-12 h-12 md:w-16 md:h-16 bg-secondary/20 rounded-full blur-xl" />
                            <div className="absolute -bottom-4 -left-8 w-20 h-20 md:w-24 md:h-24 border-2 border-primary/20 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
