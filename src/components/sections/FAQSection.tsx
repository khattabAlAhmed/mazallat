'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
    key: string;
}

const faqs: FAQ[] = [
    { key: 'difference' },
    { key: 'guarantee' },
    { key: 'fabricVsSheets' },
    { key: 'pricing' },
];

const FAQSection = () => {
    const t = useTranslations('FAQSection');
    const locale = useLocale();
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

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

        const items = listRef.current?.children;
        if (items) {
            gsap.fromTo(items,
                { opacity: 0, x: locale === 'ar' ? 50 : -50 },
                {
                    opacity: 1, x: 0, duration: 0.5,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [locale]);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section ref={sectionRef} className="section-padding bg-muted/30 relative overflow-hidden" id="faq">
            {/* Decorative */}
            <div className="absolute top-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <HelpCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">{locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* FAQ List */}
                <div ref={listRef} className="max-w-3xl mx-auto space-y-3 md:space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.key}
                            className={`rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index
                                    ? 'bg-card shadow-xl border-2 border-primary/30'
                                    : 'bg-card shadow-md border border-border hover:border-primary/20'
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center gap-4 text-left"
                            >
                                {/* Number Badge */}
                                <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${openIndex === index
                                        ? 'bg-gradient-to-r from-primary to-cyan-500 text-white'
                                        : 'bg-muted text-muted-foreground'
                                    }`}>
                                    {index + 1}
                                </div>

                                <span className={`flex-1 text-base md:text-lg font-medium transition-colors ${openIndex === index ? 'text-primary' : 'text-card-foreground'
                                    }`}>
                                    {t(`faqs.${faq.key}.question`)}
                                </span>

                                <ChevronDown
                                    className={`flex-shrink-0 w-5 h-5 text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                                    <div className="ps-12 md:ps-14 text-muted-foreground text-sm md:text-base leading-relaxed">
                                        {t(`faqs.${faq.key}.answer`)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
