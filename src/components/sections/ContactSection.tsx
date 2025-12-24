'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Link from 'next/link';
import { Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
    const t = useTranslations('ContactSection');
    const locale = useLocale();
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

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

        gsap.fromTo(contentRef.current,
            { opacity: 0, x: locale === 'ar' ? 50 : -50 },
            {
                opacity: 1, x: 0, duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 65%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo(formRef.current,
            { opacity: 0, x: locale === 'ar' ? -50 : 50 },
            {
                opacity: 1, x: 0, duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 65%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [locale]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const contactInfo = [
        { icon: FaPhone, label: t('info.phone'), value: '+966 53 825 6520', href: 'tel:+966538256520', color: 'bg-cyan-500/10 text-cyan-500' },
        { icon: FaWhatsapp, label: t('info.whatsapp'), value: '+966 53 439 5103', href: 'https://wa.me/966538256520', color: 'bg-green-500/10 text-green-500' },
        { icon: FaEnvelope, label: t('info.email'), value: 'info@fan-almizallat.com', href: 'mailto:info@fan-almizallat.com', color: 'bg-blue-500/10 text-blue-500' },
        { icon: FaMapMarkerAlt, label: t('info.address'), value: t('info.addressValue'), href: '#location', color: 'bg-red-500/10 text-red-500' },
        { icon: FaClock, label: locale === 'ar' ? 'ساعات العمل' : 'Working Hours', value: locale === 'ar' ? 'السبت - الخميس: 8 ص - 6 م' : 'Sat - Thu: 8 AM - 6 PM', href: null, color: 'bg-orange-500/10 text-orange-500' },
    ];

    return (
        <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden" id="contact">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <Send className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">{locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Info */}
                    <div ref={contentRef} className="space-y-6">
                        {/* Quick Action Buttons */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <Link
                                href="https://wa.me/966534395103?text=مرحباً، أريد الاستفسار عن خدماتكم"
                                target="_blank"
                                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
                            >
                                <FaWhatsapp className="w-5 h-5" />
                                <span>{t('buttons.whatsapp')}</span>
                            </Link>
                            <Link
                                href="tel:+966538256520"
                                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-4 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                            >
                                <FaPhone className="w-5 h-5" />
                                <span>{t('buttons.call')}</span>
                            </Link>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-3">
                            {contactInfo.map((item, index) => {
                                const Icon = item.icon;
                                const content = (
                                    <div className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors">
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                                            <div className="font-medium text-card-foreground" dir={item.label === t('info.phone') || item.label === t('info.whatsapp') ? 'ltr' : undefined}>
                                                {item.value}
                                            </div>
                                        </div>
                                    </div>
                                );

                                return item.href ? (
                                    <Link key={index} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} className="block">
                                        {content}
                                    </Link>
                                ) : (
                                    <div key={index}>{content}</div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form ref={formRef} onSubmit={handleSubmit} className="bg-card rounded-3xl p-6 md:p-8 shadow-xl border border-border">
                        <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-primary to-cyan-500 rounded-full" />
                            {t('form.title')}
                        </h3>

                        <div className="space-y-4 md:space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-2">
                                    {t('form.name')}
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground"
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
                                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground"
                                    placeholder={t('form.phonePlaceholder')}
                                    dir="ltr"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-2">
                                    {t('form.service')}
                                </label>
                                <select className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-muted-foreground">
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
                                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none placeholder:text-muted-foreground"
                                    placeholder={t('form.messagePlaceholder')}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
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
