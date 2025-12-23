'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaWhatsapp, FaPhone, FaArrowUp } from 'react-icons/fa';
import Link from 'next/link';

const FloatingContactButtons = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animate buttons on mount
        gsap.fromTo(containerRef.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, delay: 1 }
        );

        // Show/hide scroll to top button
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            ref={containerRef}
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        >
            {/* Scroll to Top */}
            <button
                onClick={scrollToTop}
                className={`w-12 h-12 bg-muted hover:bg-muted/80 text-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                aria-label="Scroll to top"
            >
                <FaArrowUp className="w-5 h-5" />
            </button>

            {/* Phone Button */}
            <Link
                href="tel:+966500000000"
                className="w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="اتصل بنا"
            >
                <FaPhone className="w-6 h-6" />
            </Link>

            {/* WhatsApp Button */}
            <Link
                href="https://wa.me/966500000000?text=مرحباً، أريد الاستفسار عن خدماتكم"
                target="_blank"
                className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse"
                aria-label="تواصل عبر الواتساب"
            >
                <FaWhatsapp className="w-7 h-7" />
            </Link>
        </div>
    );
};

export default FloatingContactButtons;
