'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

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
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const items = listRef.current?.children;

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

        if (items) {
            gsap.fromTo(items,
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0, duration: 0.5,
                    stagger: 0.1,
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

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section ref={sectionRef} className="py-20 lg:py-32 bg-background" id="faq">
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

                <div ref={listRef} className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.key}
                            className="bg-card rounded-xl shadow-md overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                            >
                                <span className="text-lg font-medium text-card-foreground">
                                    {t(`faqs.${faq.key}.question`)}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                                    {t(`faqs.${faq.key}.answer`)}
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
