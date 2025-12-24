'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaWhatsapp, FaPhone, FaArrowUp } from 'react-icons/fa';
import Link from 'next/link';

const FloatingContactButtons = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const whatsappRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        // Animate buttons on mount
        gsap.fromTo(containerRef.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, delay: 1.5, ease: 'back.out(1.7)' }
        );

        // Pulse animation for WhatsApp
        const pulseAnimation = gsap.to(whatsappRef.current, {
            scale: 1.1,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            paused: true
        });

        // Start pulse after delay
        setTimeout(() => pulseAnimation.play(), 3000);

        // Show/hide scroll to top button
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            pulseAnimation.kill();
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            ref={containerRef}
            className="fixed bottom-4 end-4 md:bottom-6 md:end-6 z-50 flex flex-col gap-2 md:gap-3"
        >
            {/* Scroll to Top */}
            <button
                onClick={scrollToTop}
                className={`w-10 h-10 md:w-12 md:h-12 bg-card hover:bg-primary text-foreground hover:text-white rounded-full shadow-lg border border-border hover:border-primary flex items-center justify-center transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                aria-label="Scroll to top"
            >
                <FaArrowUp className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Phone Button */}
            <Link
                href="tel:+966538256520"
                className="group w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/40"
                aria-label="اتصل بنا"
            >
                <FaPhone className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce" />
            </Link>

            {/* WhatsApp Button */}
            <Link
                ref={whatsappRef}
                href="https://wa.me/966534395103?text=مرحباً، أريد الاستفسار عن خدماتكم"
                target="_blank"
                className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40"
                aria-label="تواصل عبر الواتساب"
            >
                {/* Ping Animation */}
                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
                <FaWhatsapp className="relative w-7 h-7 md:w-8 md:h-8" />
            </Link>
        </div>
    );
};

export default FloatingContactButtons;
