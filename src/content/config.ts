import { defineCollection, z } from "astro:content";

const categorySlugs = [
  "ai-automation",
  "marketing",
  "content",
  "quan-ly-van-hanh",
  "deepwork",
  "reviews-sach",
] as const;

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().max(60),
    description: z.string().min(50).max(160),
    publishDate: z.date(),
    category: z.enum(categorySlugs),
    secondaryCategories: z.array(z.enum(categorySlugs)).optional(),
    tags: z.array(z.string()),
    image: z.string(),
    imageAlt: z.string().optional(),
    ogImage: z.string().optional(),
    ogTitle: z.string().max(60).optional(),
    ogDescription: z.string().max(160).optional(),
    canonicalUrl: z.string().url().optional(),
    noIndex: z.boolean().default(false),
    author: z.string().default("Bình Vương"),
    readingTime: z.string(),
    modifiedDate: z.date().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const hubsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    color: z.enum(["purple", "orange", "blue", "green", "yellow"]),
    chapters: z.array(
      z.object({
        title: z.string(),
        slug: z.string(),
        excerpt: z.string(),
        duration: z.string().optional(),
      }),
    ),
    totalReadingTime: z.string(),
    image: z.string().optional(),
  }),
});

const toolsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    category: z.enum(["extensions", "crm", "seo", "productivity"]),
    features: z.array(z.string()),
    pricing: z.object({
      isFree: z.boolean(),
      price: z.string().optional(),
    }),
    image: z.string(),
    users: z.string().optional(),
    rating: z.number().optional(),
    reviewCount: z.number().optional(),
    demoUrl: z.string().optional(),
    downloadUrl: z.string().optional(),
    relatedPosts: z.array(z.string()).optional(),
  }),
});

const caseStudiesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    client: z.string(),
    clientLogo: z.string().optional(),
    industry: z.enum([
      "healthcare",
      "education",
      "sme",
      "real-estate",
      "other",
    ]),
    image: z.string(),
    challenge: z.string(),
    solution: z.string(),
    results: z.array(
      z.object({
        metric: z.string(),
        before: z.string().optional(),
        after: z.string(),
        change: z.string(),
      }),
    ),
    testimonial: z
      .object({
        quote: z.string(),
        name: z.string(),
        role: z.string(),
        avatar: z.string().optional(),
      })
      .optional(),
    timeline: z.string(),
    services: z.array(z.string()),
  }),
});

const coursesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    originalPrice: z.number().optional(),
    currency: z.string().default("VND"),
    image: z.string(),
    previewVideo: z.string().optional(),
    curriculum: z.array(
      z.object({
        moduleTitle: z.string(),
        lessons: z.array(z.string()),
        duration: z.string(),
      }),
    ),
    instructor: z.object({
      name: z.string(),
      avatar: z.string(),
      bio: z.string(),
    }),
    testimonials: z.array(
      z.object({
        name: z.string(),
        avatar: z.string().optional(),
        quote: z.string(),
        rating: z.number(),
      }),
    ),
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
    features: z.array(z.string()),
    guarantee: z.string().optional(),
    externalUrl: z.string(),
  }),
});

export const collections = {
  posts: postsCollection,
  hubs: hubsCollection,
  tools: toolsCollection,
  "case-studies": caseStudiesCollection,
  courses: coursesCollection,
};
