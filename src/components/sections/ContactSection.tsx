'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
    const t = useTranslations('ContactSection');
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const content = contentRef.current;
        const form = formRef.current;

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

        gsap.fromTo(content,
            { opacity: 0, x: -50 },
            {
                opacity: 1, x: 0, duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo(form,
            { opacity: 0, x: 50 },
            {
                opacity: 1, x: 0, duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <section ref={sectionRef} className="py-20 lg:py-32 bg-muted/30" id="contact">
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

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div ref={contentRef} className="space-y-8">
                        <h3 className="text-2xl font-bold text-foreground mb-6">
                            {t('info.title')}
                        </h3>

                        {/* Quick Contact Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="https://wa.me/966500000000?text=مرحباً، أريد الاستفسار عن خدماتكم"
                                target="_blank"
                                className="flex items-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                            >
                                <FaWhatsapp className="w-6 h-6" />
                                <span>{t('buttons.whatsapp')}</span>
                            </Link>
                            <Link
                                href="tel:+966500000000"
                                className="flex items-center gap-3 px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                            >
                                <FaPhone className="w-5 h-5" />
                                <span>{t('buttons.call')}</span>
                            </Link>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaPhone className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">{t('info.phone')}</h4>
                                    <p className="text-muted-foreground" dir="ltr">+966 50 000 0000</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaWhatsapp className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">{t('info.whatsapp')}</h4>
                                    <p className="text-muted-foreground" dir="ltr">+966 50 000 0000</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaEnvelope className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">{t('info.email')}</h4>
                                    <p className="text-muted-foreground">info@fan-almizallat.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaMapMarkerAlt className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">{t('info.address')}</h4>
                                    <p className="text-muted-foreground">{t('info.addressValue')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form ref={formRef} onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-card-foreground mb-6">
                            {t('form.title')}
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-2">
                                    {t('form.name')}
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder={t('form.namePlaceholder')}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-2">
                                    {t('form.phone')}
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder={t('form.phonePlaceholder')}
                                    dir="ltr"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-2">
                                    {t('form.service')}
                                </label>
                                <select className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option value="">{t('form.selectService')}</option>
                                    <option value="carShades">{t('form.services.carShades')}</option>
                                    <option value="screens">{t('form.services.screens')}</option>
                                    <option value="pergolas">{t('form.services.pergolas')}</option>
                                    <option value="hangars">{t('form.services.hangars')}</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-2">
                                    {t('form.message')}
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    placeholder={t('form.messagePlaceholder')}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-lg transition-colors"
                            >
                                {t('form.submit')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
