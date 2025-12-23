'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaSnapchat, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import Image from 'next/image';

const Footer = () => {
    const t = useTranslations('Footer');
    const navItems = useTranslations('navItems');
    const locale = useLocale();

    const socialLinks = [
        { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400' },
        { icon: FaSnapchat, href: 'https://snapchat.com', label: 'Snapchat', color: 'hover:bg-yellow-400' },
        { icon: FaTiktok, href: 'https://tiktok.com', label: 'TikTok', color: 'hover:bg-black' },
        { icon: FaXTwitter, href: 'https://twitter.com', label: 'X', color: 'hover:bg-black' },
        { icon: FaWhatsapp, href: 'https://wa.me/966538256520', label: 'WhatsApp', color: 'hover:bg-green-500' },
    ];

    const quickLinks = [
        { label: navItems('home'), href: '#' },
        { label: navItems('about'), href: '#about' },
        { label: navItems('services'), href: '#services' },
        { label: navItems('projects'), href: '#projects' },
        { label: navItems('contact'), href: '#contact' },
    ];

    const services = [
        { label: locale === 'ar' ? 'مظلات السيارات' : 'Car Shades', href: '#services' },
        { label: locale === 'ar' ? 'السواتر' : 'Privacy Screens', href: '#services' },
        { label: locale === 'ar' ? 'البرجولات' : 'Pergolas', href: '#services' },
        { label: locale === 'ar' ? 'الهناجر' : 'Hangars', href: '#services' },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
            </div>

            {/* Top Wave */}
            <div className="absolute top-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
                    <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,0 L0,0 Z" fill="var(--background)" />
                </svg>
            </div>

            <div className="relative container mx-auto px-4 pt-20 pb-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Image
                                src="/logo.png"
                                alt={locale === 'ar' ? 'فن المظلات' : 'Fan Al-Mazallat'}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-xl shadow-lg"
                            />
                            <div>
                                <h3 className="text-xl font-bold">{locale === 'ar' ? 'فن المظلات' : 'Fan Al-Mazallat'}</h3>
                                <p className="text-sm text-white/60">{locale === 'ar' ? 'جدة - السعودية' : 'Jeddah - KSA'}</p>
                            </div>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                            {locale === 'ar'
                                ? 'نقدم حلول تظليل عصرية وسواتر ذكية بجودة عالية وضمان يصل لـ 10 سنوات.'
                                : 'We provide modern shading solutions and smart screens with high quality and up to 10-year warranty.'
                            }
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-white ${social.color}`}
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-primary rounded-full" />
                            {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/70 hover:text-primary transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-primary rounded-full" />
                            {locale === 'ar' ? 'خدماتنا' : 'Our Services'}
                        </h4>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service.label}>
                                    <Link
                                        href={service.href}
                                        className="text-white/70 hover:text-primary transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors" />
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-primary rounded-full" />
                            {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="tel:+966534395103" className="flex items-start gap-3 text-white/70 hover:text-primary transition-colors">
                                    <Phone className="w-5 h-5 mt-0.5 text-primary" />
                                    <span dir="ltr">+966 53 439 5103</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://wa.me/966538256520" className="flex items-start gap-3 text-white/70 hover:text-green-400 transition-colors">
                                    <FaWhatsapp className="w-5 h-5 mt-0.5 text-green-400" />
                                    <span dir="ltr">+966 53 825 6520</span>
                                </Link>
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <Mail className="w-5 h-5 mt-0.5 text-primary" />
                                <span>info@fan-almizallat.com</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <MapPin className="w-5 h-5 mt-0.5 text-primary" />
                                <span>{locale === 'ar' ? 'جدة، المملكة العربية السعودية' : 'Jeddah, Saudi Arabia'}</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/70">
                                <Clock className="w-5 h-5 mt-0.5 text-primary" />
                                <span>{locale === 'ar' ? 'السبت - الخميس: 8 ص - 6 م' : 'Sat - Thu: 8 AM - 6 PM'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-white/60">
                            {t('copyright')}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-white/60">
                            <Link href="/privacy" className="hover:text-primary transition-colors">
                                {t('bottomLinks.privacy')}
                            </Link>
                            <Link href="/terms" className="hover:text-primary transition-colors">
                                {t('bottomLinks.terms')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
