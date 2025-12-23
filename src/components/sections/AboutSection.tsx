'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const t = useTranslations('AboutSection');
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const text = textRef.current;
        const image = imageRef.current;

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

        gsap.fromTo(text,
            { opacity: 0, x: -50 },
            {
                opacity: 1, x: 0, duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo(image,
            { opacity: 0, x: 50, scale: 0.9 },
            {
                opacity: 1, x: 0, scale: 1, duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-20 lg:py-32 bg-background" id="about">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <h2
                    ref={titleRef}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-foreground"
                >
                    {t('title')}
                    <span className="block mt-2 text-primary">{t('subtitle')}</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div ref={textRef} className="space-y-6">
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t('paragraph1')}
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t('paragraph2')}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-primary">+500</div>
                                <div className="text-sm text-muted-foreground mt-1">{t('stats.projects')}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-primary">10+</div>
                                <div className="text-sm text-muted-foreground mt-1">{t('stats.years')}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
                                <div className="text-sm text-muted-foreground mt-1">{t('stats.satisfaction')}</div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div ref={imageRef} className="relative">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-blue-500/20">
                            <div className="absolute inset-0 flex items-center justify-center text-6xl">
                                🏗️
                            </div>
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
