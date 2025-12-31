export const categories = [
  {
    slug: "ai-automation",
    label: "AI & Automation",
    color: "purple",
    icon: "⚡",
  },
  {
    slug: "marketing",
    label: "Marketing",
    color: "blue",
    icon: "📈",
  },
  {
    slug: "content",
    label: "Content",
    color: "green",
    icon: "✍️",
  },
  {
    slug: "quan-ly-van-hanh",
    label: "Quản lý & Vận hành",
    color: "gray",
    icon: "🏢",
  },
  {
    slug: "deepwork",
    label: "Deep Work",
    color: "yellow",
    icon: "🎯",
  },
  {
    slug: "reviews-sach",
    label: "Reviews Sách",
    color: "orange",
    icon: "📖",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const getCategoryBySlug = (slug: string) =>
  categories.find((cat) => cat.slug === slug);

export const getCategoryColor = (color: string) => {
  const colorMap: Record<string, string> = {
    purple: "text-purple-500 bg-purple-500/10 border-purple-500/30",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/30",
    green: "text-green-500 bg-green-500/10 border-green-500/30",
    yellow: "text-yellow-600 bg-yellow-500/10 border-yellow-500/30",
    orange: "text-orange-500 bg-orange-500/10 border-orange-500/30",
    gray: "text-gray-500 bg-gray-500/10 border-gray-500/30",
  };
  return colorMap[color] || colorMap.gray;
};
