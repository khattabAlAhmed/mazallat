'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: string;
    category: string;
    image: string;
}

// Placeholder projects - replace with real data
const projects: Project[] = [
    { id: '1', category: 'carShades', image: '🚗' },
    { id: '2', category: 'screens', image: '🏠' },
    { id: '3', category: 'pergolas', image: '🌳' },
    { id: '4', category: 'hangars', image: '🏭' },
    { id: '5', category: 'carShades', image: '🚙' },
    { id: '6', category: 'screens', image: '🏡' },
];

const categories = ['all', 'carShades', 'screens', 'pergolas', 'hangars'];

const ProjectsSection = () => {
    const t = useTranslations('ProjectsSection');
    const [activeCategory, setActiveCategory] = useState('all');
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const items = gridRef.current?.children;

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
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1, scale: 1, duration: 0.5,
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
    }, [activeCategory]);

    const handleCategoryChange = (category: string) => {
        const items = gridRef.current?.children;
        if (items) {
            gsap.to(items, {
                opacity: 0,
                scale: 0.8,
                duration: 0.2,
                stagger: 0.05,
                onComplete: () => {
                    setActiveCategory(category);
                    gsap.fromTo(items,
                        { opacity: 0, scale: 0.8 },
                        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05 }
                    );
                }
            });
        } else {
            setActiveCategory(category);
        }
    };

    return (
        <section ref={sectionRef} className="py-20 lg:py-32 bg-background" id="projects">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <h2
                    ref={titleRef}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-foreground"
                >
                    {t('title')}
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                    {t('subtitle')}
                </p>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                        >
                            {t(`categories.${category}`)}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-blue-500/20 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Placeholder Image */}
                            <div className="absolute inset-0 flex items-center justify-center text-6xl">
                                {project.image}
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white font-bold text-lg mb-1">
                                    {t(`categories.${project.category}`)}
                                </h3>
                                <p className="text-white/80 text-sm">
                                    جدة، المملكة العربية السعودية
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
                        {t('viewAll')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
