# Keystatic CMS - Hướng dẫn cho người mới

Keystatic là CMS dựa trên Git, lưu content dưới dạng MD/MDX/JSON/YAML files. Hoàn toàn miễn phí, self-hosted, và tích hợp tốt với Astro.

## Mục lục

1. [Cài đặt](#1-cài-đặt)
2. [Cấu hình](#2-cấu-hình)
3. [Tạo Collections](#3-tạo-collections)
4. [Sử dụng Admin UI](#4-sử-dụng-admin-ui)
5. [Tích hợp Astro Content Collections](#5-tích-hợp-astro-content-collections)
6. [Deploy](#6-deploy)

---

## 1. Cài đặt

### Cài packages cần thiết

```bash
# Thêm Keystatic, React và Markdoc
npx astro add react markdoc keystatic

# Hoặc cài manual
npm install @keystatic/core @keystatic/astro @astrojs/react @astrojs/markdoc
```

### Cập nhật `astro.config.mjs`

```javascript
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  output: "hybrid", // hoặc 'server' cho full SSR
});
```

> **Lưu ý:** Keystatic cần server-side code, nên bạn cần `output: 'hybrid'` hoặc `'server'`.

---

## 2. Cấu hình

### Tạo file `keystatic.config.ts` ở root

```typescript
import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local", // Lưu files local (dùng 'github' cho production)
  },

  collections: {
    // Định nghĩa collections ở đây
  },
});
```

### Storage options

| Option   | Mô tả                              |
| -------- | ---------------------------------- |
| `local`  | Lưu files trong project (dev mode) |
| `github` | Commit trực tiếp vào GitHub repo   |
| `cloud`  | Sử dụng Keystatic Cloud            |

---

## 3. Tạo Collections

### Ví dụ: Blog posts collection

```typescript
// keystatic.config.ts
import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: { kind: "local" },

  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },

      schema: {
        title: fields.slug({ name: { label: "Title" } }),

        description: fields.text({
          label: "Description",
          multiline: true,
        }),

        publishDate: fields.date({
          label: "Publish Date",
        }),

        category: fields.select({
          label: "Category",
          options: [
            { label: "AI & Automation", value: "ai-automation" },
            { label: "Marketing", value: "marketing" },
            { label: "Content", value: "content" },
          ],
          defaultValue: "ai-automation",
        }),

        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),

        image: fields.image({
          label: "Featured Image",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),

        featured: fields.checkbox({
          label: "Featured Post",
          defaultValue: false,
        }),

        content: fields.markdoc({
          label: "Content",
        }),
      },
    }),
  },
});
```

### Các loại fields phổ biến

| Field                  | Mô tả                      |
| ---------------------- | -------------------------- |
| `fields.text()`        | Text input                 |
| `fields.slug()`        | Slug với auto-generate     |
| `fields.date()`        | Date picker                |
| `fields.select()`      | Dropdown select            |
| `fields.multiselect()` | Multiple select            |
| `fields.checkbox()`    | Boolean checkbox           |
| `fields.number()`      | Number input               |
| `fields.image()`       | Image upload               |
| `fields.file()`        | File upload                |
| `fields.url()`         | URL input                  |
| `fields.array()`       | Array of items             |
| `fields.object()`      | Nested object              |
| `fields.conditional()` | Conditional fields         |
| `fields.markdoc()`     | Rich text editor (Markdoc) |
| `fields.mdx()`         | MDX content                |
| `fields.document()`    | Full document editor       |

---

## 4. Sử dụng Admin UI

### Truy cập Admin Panel

Chạy dev server và mở:

```bash
npm run dev
# Mở http://localhost:4321/keystatic
```

### Giao diện Admin

- **Dashboard:** Xem tất cả collections
- **Create:** Tạo content mới
- **Edit:** Chỉnh sửa content
- **Preview:** Xem trước content
- **Media:** Quản lý images/files

### Workflow cơ bản

1. Truy cập `/keystatic`
2. Chọn collection (vd: Blog Posts)
3. Click "Create" để tạo bài mới
4. Điền các fields
5. Click "Save" → File được tạo trong `src/content/posts/`

---

## 5. Tích hợp Astro Content Collections

### Đồng bộ schema với Astro

Keystatic tạo files, Astro Content Collections đọc files. Cần đảm bảo schema khớp nhau.

**`src/content/config.ts`** (Astro):

```typescript
import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    category: z.enum(["ai-automation", "marketing", "content"]),
    tags: z.array(z.string()),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
};
```

### Đọc content trong Astro pages

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');
const sortedPosts = posts.sort(
  (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
);
---

<ul>
  {sortedPosts.map((post) => (
    <li>
      <a href={`/blog/${post.slug}/`}>{post.data.title}</a>
    </li>
  ))}
</ul>
```

### Sử dụng Keystatic Reader API (alternative)

```typescript
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);
const posts = await reader.collections.posts.all();
```

---

## 6. Deploy

### Option A: GitHub Storage (Recommended)

Cập nhật `keystatic.config.ts`:

```typescript
export default config({
  storage: {
    kind: "github",
    repo: "username/repo-name",
  },
  // ...
});
```

Thêm environment variables:

```env
# .env
KEYSTATIC_GITHUB_CLIENT_ID=your_client_id
KEYSTATIC_GITHUB_CLIENT_SECRET=your_client_secret
KEYSTATIC_SECRET=random_secret_string
```

### Option B: Keystatic Cloud

```typescript
export default config({
  storage: {
    kind: "cloud",
  },
  cloud: {
    project: "your-project-name",
  },
});
```

### Cần Adapter

Vì Keystatic cần SSR, thêm adapter:

```bash
npx astro add cloudflare  # hoặc node, vercel, netlify
```

---

## Ví dụ hoàn chỉnh

### `keystatic.config.ts`

```typescript
import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: { kind: "local" },

  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        publishDate: fields.date({ label: "Publish Date" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "AI", value: "ai-automation" },
            { label: "Marketing", value: "marketing" },
          ],
          defaultValue: "ai-automation",
        }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),

    tools: collection({
      label: "Tools",
      slugField: "title",
      path: "src/content/tools/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        icon: fields.text({ label: "Icon (emoji)" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Extensions", value: "extensions" },
            { label: "CRM", value: "crm" },
            { label: "SEO", value: "seo" },
          ],
          defaultValue: "extensions",
        }),
        isFree: fields.checkbox({ label: "Free?", defaultValue: true }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: "Site Settings",
      path: "src/data/settings",
      schema: {
        siteName: fields.text({ label: "Site Name" }),
        tagline: fields.text({ label: "Tagline" }),
        socialLinks: fields.object({
          facebook: fields.url({ label: "Facebook" }),
          twitter: fields.url({ label: "Twitter" }),
          linkedin: fields.url({ label: "LinkedIn" }),
        }),
      },
    }),
  },
});
```

---

## Tips

1. **Local development:** Dùng `storage: { kind: 'local' }` khi dev
2. **Sync schema:** Giữ Keystatic schema và Astro Content Collections schema đồng bộ
3. **Markdoc:** Dùng Markdoc thay vì MDX cho compatibility tốt hơn
4. **Images:** Dùng `fields.image()` để upload và quản lý images
5. **Singletons:** Dùng cho data không lặp lại (settings, about page)

---

## Tài liệu tham khảo

- [Keystatic Official Docs](https://keystatic.com/docs/introduction)
- [Astro + Keystatic Guide](https://docs.astro.build/en/guides/cms/keystatic/)
- [Keystatic Installation for Astro](https://keystatic.com/docs/installation-astro)
- [Thinkmill: Integrating Keystatic with Astro](https://www.thinkmill.com.au/blog/integrating-keystatic-with-astro-s-content-collections)
