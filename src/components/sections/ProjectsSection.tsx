'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: string;
    category: string;
    gradient: string;
}

const projects: Project[] = [
    { id: '1', category: 'carShades', gradient: 'from-cyan-500 to-blue-600' },
    { id: '2', category: 'screens', gradient: 'from-emerald-500 to-green-600' },
    { id: '3', category: 'pergolas', gradient: 'from-purple-500 to-pink-600' },
    { id: '4', category: 'hangars', gradient: 'from-orange-500 to-red-600' },
    { id: '5', category: 'carShades', gradient: 'from-blue-500 to-indigo-600' },
    { id: '6', category: 'screens', gradient: 'from-teal-500 to-cyan-600' },
];

const categories = ['all', 'carShades', 'screens', 'pergolas', 'hangars'];

const ProjectsSection = () => {
    const t = useTranslations('ProjectsSection');
    const locale = useLocale();
    const [activeCategory, setActiveCategory] = useState('all');
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const filtersRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

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
        const items = gridRef.current?.children;
        if (items) {
            gsap.fromTo(items,
                { opacity: 0, scale: 0.8, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.08 }
            );
        }
    }, [activeCategory]);

    return (
        <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden" id="projects">
            {/* Decorative */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
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
                            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${activeCategory === category
                                    ? 'bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg shadow-primary/30'
                                    : 'bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-primary'
                                }`}
                        >
                            {t(`categories.${category}`)}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}>
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />

                            {/* View Icon */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
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

                {/* View All Button */}
                <div className="text-center mt-10 md:mt-14">
                    <button className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-2xl font-semibold text-base md:text-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
                        {t('viewAll')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
