'use client';

import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitch from './LanguageSwitch';
import ModeToggler from './mode-toggler';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

const Header = () => {
    const t = useTranslations('HomePage');
    const navItems = useTranslations('navItems');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const locale = useLocale();

    const navItemsList = [
        { label: navItems('home'), href: '#' },
        { label: navItems('about'), href: '#about' },
        { label: navItems('services'), href: '#services' },
        { label: navItems('projects'), href: '#projects' },
        { label: navItems('contact'), href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Main Header - Sticky with glass effect */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-background/90 backdrop-blur-lg shadow-lg border-b border-border'
                : 'bg-transparent'
                }`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt={t('title')}
                                width={48}
                                height={48}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-xl shadow-lg"
                                priority
                            />
                            <div className="hidden sm:block">
                                <h1 className={`text-lg md:text-xl font-bold transition-colors ${isScrolled ? 'text-foreground' : 'text-white'
                                    }`}>
                                    {t('title')}
                                </h1>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navItemsList.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-primary/10 ${isScrolled
                                        ? 'text-foreground hover:text-primary'
                                        : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-2 md:gap-3">
                            {/* Quick Contact - Desktop */}
                            <div className="hidden md:flex items-center gap-2">
                                <Link
                                    href="https://wa.me/966538256520"
                                    target="_blank"
                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                >
                                    <FaWhatsapp className="w-5 h-5" />
                                    <span className="hidden xl:inline">واتساب</span>
                                </Link>
                                <Link
                                    href="tel:+966538256520"
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span className="hidden xl:inline">اتصل الآن</span>
                                </Link>
                            </div>

                            {/* Language & Theme */}
                            <div className={`flex items-center gap-1 ${isScrolled ? '' : 'text-white'}`}>
                                <LanguageSwitch />
                                <ModeToggler />
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled
                                    ? 'hover:bg-muted'
                                    : 'hover:bg-white/10 text-white'
                                    }`}
                                aria-label="Toggle menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className={`absolute ${locale === 'ar' ? 'right-0' : 'left-0'} top-0 bottom-0 w-80 max-w-[85vw] bg-background shadow-2xl`}>
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/logo.png"
                                    alt={t('title')}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-xl"
                                />
                                <h2 className="text-lg font-bold text-foreground">{t('title')}</h2>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation Items */}
                        <nav className="p-4 space-y-1">
                            {navItemsList.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Quick Actions */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-muted/50">
                            <div className="flex gap-2">
                                <Link
                                    href="https://wa.me/966534395103"
                                    target="_blank"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
                                >
                                    <FaWhatsapp className="w-5 h-5" />
                                    <span>واتساب</span>
                                </Link>
                                <Link
                                    href="tel:+966538256520"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-primary text-white rounded-xl font-medium transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>اتصل</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;