import { config, fields, collection, singleton } from "@keystatic/core";

// Category options for blog posts
const categoryOptions = [
  { label: "AI & Automation", value: "ai-automation" },
  { label: "Marketing", value: "marketing" },
  { label: "Content", value: "content" },
  { label: "Quản lý & Vận hành", value: "quan-ly-van-hanh" },
  { label: "Deep Work", value: "deepwork" },
  { label: "Reviews Sách", value: "reviews-sach" },
] as const;

// Tool category options
const toolCategoryOptions = [
  { label: "Extensions", value: "extensions" },
  { label: "CRM", value: "crm" },
  { label: "SEO", value: "seo" },
  { label: "Productivity", value: "productivity" },
] as const;

// Hub color options
const hubColorOptions = [
  { label: "Purple", value: "purple" },
  { label: "Orange", value: "orange" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Yellow", value: "yellow" },
] as const;

export default config({
  storage: {
    kind: "local",
  },

  ui: {
    brand: {
      name: "Bình Vương CMS",
    },
  },

  collections: {
    // Blog Posts Collection
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        description: fields.text({
          label: "Description",
          description: "SEO description (50-160 characters)",
          multiline: true,
          validation: { isRequired: true },
        }),
        publishDate: fields.date({
          label: "Publish Date",
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: "Category",
          options: [...categoryOptions],
          defaultValue: "ai-automation",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        image: fields.text({
          label: "Featured Image URL",
          description: "URL to the featured image",
        }),
        imageAlt: fields.text({
          label: "Image Alt Text",
        }),
        author: fields.text({
          label: "Author",
          defaultValue: "Bình Vương",
        }),
        readingTime: fields.text({
          label: "Reading Time",
          description: "e.g., '5 phút'",
          validation: { isRequired: true },
        }),
        featured: fields.checkbox({
          label: "Featured Post",
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: "Draft",
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: "Content",
        }),
      },
    }),

    // Content Hubs Collection
    hubs: collection({
      label: "Content Hubs",
      slugField: "title",
      path: "src/content/hubs/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        icon: fields.text({
          label: "Icon (emoji)",
          description: "e.g., 🤖",
          validation: { isRequired: true },
        }),
        color: fields.select({
          label: "Color Theme",
          options: [...hubColorOptions],
          defaultValue: "purple",
        }),
        chapters: fields.array(
          fields.object({
            title: fields.text({ label: "Chapter Title" }),
            slug: fields.text({ label: "Slug" }),
            excerpt: fields.text({ label: "Excerpt", multiline: true }),
            duration: fields.text({ label: "Duration (optional)" }),
          }),
          {
            label: "Chapters",
            itemLabel: (props) => props.fields.title.value || "New Chapter",
          },
        ),
        totalReadingTime: fields.text({
          label: "Total Reading Time",
          description: "e.g., '2.5 giờ đọc'",
        }),
        image: fields.text({
          label: "Image URL (optional)",
        }),
        content: fields.markdoc({
          label: "Content",
        }),
      },
    }),

    // Tools Collection
    tools: collection({
      label: "Tools",
      slugField: "title",
      path: "src/content/tools/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        icon: fields.text({
          label: "Icon (emoji)",
          description: "e.g., 🔧",
        }),
        category: fields.select({
          label: "Category",
          options: [...toolCategoryOptions],
          defaultValue: "extensions",
        }),
        features: fields.array(fields.text({ label: "Feature" }), {
          label: "Features",
          itemLabel: (props) => props.value,
        }),
        pricing: fields.object({
          isFree: fields.checkbox({ label: "Is Free?", defaultValue: true }),
          price: fields.text({ label: "Price (if not free)" }),
        }),
        image: fields.text({
          label: "Image URL",
          validation: { isRequired: true },
        }),
        users: fields.text({ label: "Number of Users (e.g., '1,200+')" }),
        rating: fields.number({
          label: "Rating",
          validation: { min: 0, max: 5 },
        }),
        reviewCount: fields.number({ label: "Review Count" }),
        demoUrl: fields.url({ label: "Demo URL" }),
        downloadUrl: fields.url({ label: "Download URL" }),
        relatedPosts: fields.array(
          fields.text({ label: "Related Post Slug" }),
          {
            label: "Related Posts",
          },
        ),
        content: fields.markdoc({
          label: "Content",
        }),
      },
    }),

    // Courses Collection
    courses: collection({
      label: "Courses",
      slugField: "title",
      path: "src/content/courses/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        price: fields.number({
          label: "Price (VND)",
          validation: { isRequired: true },
        }),
        originalPrice: fields.number({ label: "Original Price (optional)" }),
        currency: fields.text({
          label: "Currency",
          defaultValue: "VND",
        }),
        image: fields.text({
          label: "Image URL",
          validation: { isRequired: true },
        }),
        previewVideo: fields.url({ label: "Preview Video URL" }),
        curriculum: fields.array(
          fields.object({
            moduleTitle: fields.text({ label: "Module Title" }),
            lessons: fields.array(fields.text({ label: "Lesson" }), {
              label: "Lessons",
            }),
            duration: fields.text({ label: "Duration" }),
          }),
          {
            label: "Curriculum",
            itemLabel: (props) =>
              props.fields.moduleTitle.value || "New Module",
          },
        ),
        instructor: fields.object({
          name: fields.text({ label: "Name" }),
          avatar: fields.text({ label: "Avatar URL" }),
          bio: fields.text({ label: "Bio", multiline: true }),
        }),
        testimonials: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            avatar: fields.text({ label: "Avatar URL (optional)" }),
            quote: fields.text({ label: "Quote", multiline: true }),
            rating: fields.number({
              label: "Rating",
              validation: { min: 1, max: 5 },
            }),
          }),
          {
            label: "Testimonials",
            itemLabel: (props) => props.fields.name.value || "New Testimonial",
          },
        ),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          {
            label: "FAQ",
            itemLabel: (props) => props.fields.question.value || "New FAQ",
          },
        ),
        features: fields.array(fields.text({ label: "Feature" }), {
          label: "Features",
          itemLabel: (props) => props.value,
        }),
        guarantee: fields.text({ label: "Guarantee (optional)" }),
        externalUrl: fields.url({
          label: "External URL",
          validation: { isRequired: true },
        }),
        content: fields.markdoc({
          label: "Content",
        }),
      },
    }),

    // Case Studies Collection
    "case-studies": collection({
      label: "Case Studies",
      slugField: "title",
      path: "src/content/case-studies/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        client: fields.text({
          label: "Client Name",
          validation: { isRequired: true },
        }),
        clientLogo: fields.text({ label: "Client Logo URL" }),
        industry: fields.select({
          label: "Industry",
          options: [
            { label: "Healthcare", value: "healthcare" },
            { label: "Education", value: "education" },
            { label: "SME", value: "sme" },
            { label: "Real Estate", value: "real-estate" },
            { label: "Other", value: "other" },
          ],
          defaultValue: "other",
        }),
        image: fields.text({
          label: "Featured Image URL",
          validation: { isRequired: true },
        }),
        challenge: fields.text({
          label: "Challenge",
          multiline: true,
          validation: { isRequired: true },
        }),
        solution: fields.text({
          label: "Solution",
          multiline: true,
          validation: { isRequired: true },
        }),
        results: fields.array(
          fields.object({
            metric: fields.text({ label: "Metric" }),
            before: fields.text({ label: "Before (optional)" }),
            after: fields.text({ label: "After" }),
            change: fields.text({ label: "Change (e.g., +50%)" }),
          }),
          {
            label: "Results",
            itemLabel: (props) => props.fields.metric.value || "New Result",
          },
        ),
        testimonial: fields.object({
          quote: fields.text({ label: "Quote", multiline: true }),
          name: fields.text({ label: "Name" }),
          role: fields.text({ label: "Role" }),
          avatar: fields.text({ label: "Avatar URL (optional)" }),
        }),
        timeline: fields.text({
          label: "Timeline",
          description: "e.g., '3 tháng'",
        }),
        services: fields.array(fields.text({ label: "Service" }), {
          label: "Services Used",
        }),
        content: fields.markdoc({
          label: "Content",
        }),
      },
    }),
  },

  // Site Settings Singleton
  singletons: {
    settings: singleton({
      label: "Site Settings",
      path: "src/data/settings",
      format: { data: "json" },
      schema: {
        siteName: fields.text({ label: "Site Name" }),
        tagline: fields.text({ label: "Tagline" }),
        description: fields.text({
          label: "Site Description",
          multiline: true,
        }),
        socialLinks: fields.object({
          facebook: fields.url({ label: "Facebook" }),
          linkedin: fields.url({ label: "LinkedIn" }),
          youtube: fields.url({ label: "YouTube" }),
          zalo: fields.url({ label: "Zalo" }),
        }),
      },
    }),
  },
});
