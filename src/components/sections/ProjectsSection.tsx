'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { Eye } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: string;
    category: string;
    image: string;
    gradient: string;
}

interface ProjectsSectionProps {
    youtubeVideoId?: string;
}

// 8 projects per category = 32 total projects
const projects: Project[] = [
    // Car Shades (1-8)
    { id: '1', category: 'carShades', image: '/1.jpeg', gradient: 'from-cyan-500/60 to-blue-600/60' },
    { id: '2', category: 'carShades', image: '/2.jpeg', gradient: 'from-blue-500/60 to-indigo-600/60' },
    { id: '3', category: 'carShades', image: '/3.jpeg', gradient: 'from-sky-500/60 to-cyan-600/60' },
    { id: '4', category: 'carShades', image: '/4.jpeg', gradient: 'from-teal-500/60 to-blue-600/60' },
    // { id: '5', category: 'carShades', image: '/5.jpeg', gradient: 'from-cyan-400/60 to-sky-600/60' },
    // { id: '6', category: 'carShades', image: '/6.jpeg', gradient: 'from-blue-400/60 to-cyan-600/60' },
    // { id: '7', category: 'carShades', image: '/7.jpeg', gradient: 'from-indigo-500/60 to-blue-600/60' },
    // { id: '8', category: 'carShades', image: '/8.jpeg', gradient: 'from-sky-400/60 to-indigo-600/60' },

    // Screens (9-16)
    { id: '9', category: 'screens', image: '/9.jpeg', gradient: 'from-emerald-500/60 to-green-600/60' },
    { id: '10', category: 'screens', image: '/10.jpeg', gradient: 'from-green-500/60 to-teal-600/60' },
    { id: '11', category: 'screens', image: '/11.jpeg', gradient: 'from-teal-500/60 to-emerald-600/60' },
    { id: '12', category: 'screens', image: '/12.jpeg', gradient: 'from-lime-500/60 to-green-600/60' },
    { id: '13', category: 'screens', image: '/13.jpeg', gradient: 'from-emerald-400/60 to-teal-600/60' },
    { id: '14', category: 'screens', image: '/14.jpeg', gradient: 'from-green-400/60 to-emerald-600/60' },
    { id: '15', category: 'screens', image: '/15.jpeg', gradient: 'from-teal-400/60 to-green-600/60' },
    { id: '16', category: 'screens', image: '/16.jpeg', gradient: 'from-emerald-500/60 to-lime-600/60' },

    // Pergolas (17-24)
    { id: '17', category: 'pergolas', image: '/17.jpeg', gradient: 'from-purple-500/60 to-pink-600/60' },
    { id: '18', category: 'pergolas', image: '/18.jpeg', gradient: 'from-pink-500/60 to-rose-600/60' },
    { id: '19', category: 'pergolas', image: '/19.jpeg', gradient: 'from-fuchsia-500/60 to-purple-600/60' },
    { id: '20', category: 'pergolas', image: '/20.jpeg', gradient: 'from-violet-500/60 to-pink-600/60' },
    { id: '21', category: 'pergolas', image: '/21.jpeg', gradient: 'from-purple-400/60 to-fuchsia-600/60' },
    { id: '22', category: 'pergolas', image: '/22.jpeg', gradient: 'from-pink-400/60 to-purple-600/60' },
    { id: '23', category: 'pergolas', image: '/23.jpeg', gradient: 'from-rose-500/60 to-violet-600/60' },
    { id: '24', category: 'pergolas', image: '/24.jpeg', gradient: 'from-fuchsia-400/60 to-pink-600/60' },

    // Hangars (25-32)
    { id: '25', category: 'hangars', image: '/25.jpeg', gradient: 'from-orange-500/60 to-red-600/60' },
    { id: '26', category: 'hangars', image: '/26.jpeg', gradient: 'from-red-500/60 to-orange-600/60' },
    { id: '27', category: 'hangars', image: '/27.jpeg', gradient: 'from-amber-500/60 to-red-600/60' },
    { id: '28', category: 'hangars', image: '/28.jpeg', gradient: 'from-yellow-500/60 to-orange-600/60' },
    { id: '29', category: 'hangars', image: '/29.jpeg', gradient: 'from-orange-400/60 to-amber-600/60' },
    { id: '30', category: 'hangars', image: '/30.jpeg', gradient: 'from-red-400/60 to-rose-600/60' },
    // { id: '31', category: 'hangars', image: '/31.jpeg', gradient: 'from-amber-400/60 to-orange-600/60' },
    // { id: '32', category: 'hangars', image: '/32.jpeg', gradient: 'from-orange-500/60 to-yellow-600/60' },
];

const categories = ['all', 'carShades', 'screens', 'pergolas', 'hangars'];

const ProjectsSection = ({ youtubeVideoId = "" }: ProjectsSectionProps) => {
    const t = useTranslations('ProjectsSection');
    const locale = useLocale();
    const [activeCategory, setActiveCategory] = useState('all');
    const [visibleCount, setVisibleCount] = useState(6);
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const filtersRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const displayedProjects = filteredProjects.slice(0, visibleCount);
    const hasMore = visibleCount < filteredProjects.length;

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

        gsap.fromTo(filtersRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 0.6,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    useEffect(() => {
        setVisibleCount(6); // Reset when category changes
        const items = gridRef.current?.children;
        if (items) {
            gsap.fromTo(items,
                { opacity: 0, scale: 0.8, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.08 }
            );
        }
    }, [activeCategory]);

    const loadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    return (
        <section ref={sectionRef} className="relative section-padding overflow-hidden" id="projects">
            {/* YouTube Video Background */}
            {youtubeVideoId ? (
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                    <iframe
                        className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100%]"
                        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080`}
                        title="Portfolio Background Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : (
                <div className="absolute inset-0 bg-background" />
            )}

            {/* Overlay Layer */}
            <div className="absolute inset-0 bg-background/85 dark:bg-background/90" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 backdrop-blur-sm rounded-full mb-6">
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        <span className="text-sm font-medium text-secondary">{locale === 'ar' ? 'أعمالنا' : 'Our Work'}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Category Filters */}
                <div ref={filtersRef} className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 backdrop-blur-sm ${activeCategory === category
                                ? 'bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg shadow-primary/30'
                                : 'bg-card/80 border border-border text-muted-foreground hover:border-primary/30 hover:text-primary'
                                }`}
                        >
                            {t(`categories.${category}`)}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {displayedProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Image Background */}
                            <Image
                                src={project.image}
                                alt={t(`categories.${project.category}`)}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />

                            {/* Color Gradient Overlay - subtle touch */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-10 group-hover:opacity-60 transition-opacity duration-300`} />

                            {/* Dark overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                            {/* View Icon */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                    <Eye className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white font-bold text-sm md:text-lg mb-1">
                                    {t(`categories.${project.category}`)}
                                </h3>
                                <p className="text-white/80 text-xs md:text-sm">
                                    {locale === 'ar' ? 'جدة، السعودية' : 'Jeddah, KSA'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More / View All Button */}
                <div className="text-center mt-10 md:mt-14">
                    {hasMore ? (
                        <button
                            onClick={loadMore}
                            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-2xl font-semibold text-base md:text-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                        >
                            {locale === 'ar' ? 'عرض المزيد' : 'Load More'}
                        </button>
                    ) : (
                        <button className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-2xl font-semibold text-base md:text-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
                            {t('viewAll')}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
