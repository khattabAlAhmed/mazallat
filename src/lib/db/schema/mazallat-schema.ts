import { pgTable, text, timestamp, integer, numeric, boolean } from "drizzle-orm/pg-core";

// Hero Slides - السلايدر الرئيسي
export const heroSlides = pgTable("hero_slides", {
    id: text("id").primaryKey(),
    titleAr: text("title_ar").notNull(),
    titleEn: text("title_en").notNull(),
    subtitleAr: text("subtitle_ar"),
    subtitleEn: text("subtitle_en"),
    youtubeUrl: text("youtube_url"),
    imageUrl: text("image_url"),
    ctaTextAr: text("cta_text_ar"),
    ctaTextEn: text("cta_text_en"),
    ctaLink: text("cta_link"),
    order: integer("order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

// Services - خدماتنا
export const services = pgTable("services", {
    id: text("id").primaryKey(),
    titleAr: text("title_ar").notNull(),
    titleEn: text("title_en").notNull(),
    descriptionAr: text("description_ar").notNull(),
    descriptionEn: text("description_en").notNull(),
    shortDescAr: text("short_desc_ar"),
    shortDescEn: text("short_desc_en"),
    iconName: text("icon_name"), // Lucide icon name
    imageUrl: text("image_url"),
    slug: text("slug").notNull().unique(),
    order: integer("order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

// Projects - معرض الإنجازات
export const projects = pgTable("projects", {
    id: text("id").primaryKey(),
    titleAr: text("title_ar").notNull(),
    titleEn: text("title_en").notNull(),
    descriptionAr: text("description_ar"),
    descriptionEn: text("description_en"),
    imageUrls: text("image_urls").array(), // Array of image URLs
    category: text("category"), // e.g., "مظلات", "سواتر", "برجولات"
    location: text("location"),
    year: text("year"),
    isFeatured: boolean("is_featured").default(false).notNull(),
    order: integer("order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

// Testimonials - آراء العملاء
export const testimonials = pgTable("testimonials", {
    id: text("id").primaryKey(),
    nameAr: text("name_ar").notNull(),
    nameEn: text("name_en").notNull(),
    contentAr: text("content_ar").notNull(),
    contentEn: text("content_en").notNull(),
    rating: numeric("rating", { precision: 2, scale: 1 }).default("5.0"), // 0.0 to 5.0
    company: text("company"),
    imageUrl: text("image_url"),
    order: integer("order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

// Company Info - معلومات الشركة
export const companyInfo = pgTable("company_info", {
    id: text("id").primaryKey(),
    key: text("key").notNull().unique(), // e.g., "phone", "whatsapp", "address", "email"
    valueAr: text("value_ar").notNull(),
    valueEn: text("value_en").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

// FAQs - الأسئلة الشائعة
export const faqs = pgTable("faqs", {
    id: text("id").primaryKey(),
    questionAr: text("question_ar").notNull(),
    questionEn: text("question_en").notNull(),
    answerAr: text("answer_ar").notNull(),
    answerEn: text("answer_en").notNull(),
    order: integer("order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

// Service Features - مميزات الخدمات (Why Us section)
export const serviceFeatures = pgTable("service_features", {
    id: text("id").primaryKey(),
    titleAr: text("title_ar").notNull(),
    titleEn: text("title_en").notNull(),
    descriptionAr: text("description_ar"),
    descriptionEn: text("description_en"),
    iconName: text("icon_name"), // Lucide icon name
    order: integer("order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
