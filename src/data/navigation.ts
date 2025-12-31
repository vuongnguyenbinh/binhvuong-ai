export const mainNavigation = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Khóa học",
    href: "/khoa-hoc/",
    children: [
      {
        label: "AI Marketing Thực Chiến",
        description: "Làm chủ AI trong 30 ngày",
        href: "/khoa-hoc/ai-marketing-thuc-chien/",
      },
      {
        label: "Automation Masterclass",
        description: "Xây dựng hệ thống tự động",
        href: "/khoa-hoc/automation-masterclass/",
      },
    ],
  },
  {
    label: "Blog",
    href: "/blog/",
    megaMenu: true,
    categories: [
      { icon: "⚡", label: "AI & Automation", href: "/blog/ai-automation/" },
      { icon: "📈", label: "Marketing", href: "/blog/marketing/" },
      { icon: "✍️", label: "Content", href: "/blog/content/" },
      {
        icon: "🏢",
        label: "Quản lý & Vận hành",
        href: "/blog/quan-ly-van-hanh/",
      },
      { icon: "🎯", label: "Deep Work", href: "/blog/deepwork/" },
      { icon: "📖", label: "Reviews Sách", href: "/blog/reviews-sach/" },
    ],
    hubs: [
      {
        icon: "🤖",
        label: "AI Marketing Fundamentals",
        description: "Lộ trình từ cơ bản đến nâng cao",
        href: "/hub/ai-marketing-co-ban/",
      },
      {
        icon: "🔄",
        label: "Automation Playbook",
        description: "Tự động hóa quy trình doanh nghiệp",
        href: "/hub/automation-playbook/",
      },
      {
        icon: "🧘",
        label: "Deep Work System",
        description: "Xây dựng thói quen làm việc sâu",
        href: "/hub/deep-work-system/",
      },
    ],
  },
  {
    label: "AI & Tools",
    href: "/tools/",
    megaMenu: true,
    toolCategories: [
      {
        title: "Extensions",
        icon: "🔌",
        items: [
          {
            label: "Focus to Notion",
            description: "Quản lý task • Free",
            href: "/tools/extensions/focus-to-notion/",
          },
          {
            label: "Focus to GGSheet",
            description: "Sync dữ liệu • Free",
            href: "/tools/extensions/focus-to-ggsheet/",
          },
          {
            label: "Webhook to n8n",
            description: "Automation • Free",
            href: "/tools/extensions/webhook-to-n8n/",
          },
        ],
      },
      {
        title: "Business Tools",
        icon: "💼",
        items: [
          {
            label: "MiniCRM Phòng Khám",
            description: "Quản lý bệnh nhân • 99k/mo",
            href: "/tools/crm/phong-kham/",
          },
          {
            label: "MiniCRM Bất Động Sản",
            description: "Quản lý lead • 99k/mo",
            href: "/tools/crm/bat-dong-san/",
          },
        ],
      },
      {
        title: "SEO Tools",
        icon: "🔍",
        items: [
          {
            label: "SEO Checker",
            description: "Audit website • Free",
            href: "/tools/seo/seo-checker/",
          },
        ],
      },
    ],
  },
  { label: "Về tôi", href: "/ve-toi/" },
] as const;

export const footerNavigation = {
  blog: [
    { label: "AI & Automation", href: "/blog/ai-automation/" },
    { label: "Marketing", href: "/blog/marketing/" },
    { label: "Content", href: "/blog/content/" },
    { label: "Deep Work", href: "/blog/deepwork/" },
    { label: "Reviews Sách", href: "/blog/reviews-sach/" },
  ],
  tools: [
    { label: "Focus to Notion", href: "/tools/extensions/focus-to-notion/" },
    { label: "MiniCRM", href: "/tools/crm/phong-kham/" },
    { label: "SEO Checker", href: "/tools/seo/seo-checker/" },
  ],
  links: [
    { label: "Về tôi", href: "/ve-toi/" },
    { label: "Liên hệ", href: "/lien-he/" },
    { label: "Case Study", href: "/case-study/" },
    { label: "Khóa học", href: "/khoa-hoc/" },
  ],
} as const;
