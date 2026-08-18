const FOOD_IMAGES: Array<{ keywords: string[]; url: string }> = [
  { keywords: ["biryani", "rice", "fried rice"], url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=85" },
  { keywords: ["idly", "idli", "dosa", "sambar"], url: "https://images.unsplash.com/photo-1589301760014-d929f3979dc0?auto=format&fit=crop&w=1200&q=85" },
  { keywords: ["meal", "thali", "dal", "curry"], url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85" },
  { keywords: ["fruit", "apple", "banana", "orange"], url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=85" },
  { keywords: ["vegetable", "salad", "veg"], url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85" },
  { keywords: ["bread", "sandwich", "burger"], url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85" },
  { keywords: ["chapati", "roti", "paratha"], url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85" },
];

export function getFoodImage(foodName: string): string {
  const normalized = foodName.trim().toLowerCase();
  const match = FOOD_IMAGES.find(({ keywords }) => keywords.some((keyword) => normalized.includes(keyword)));
  return match?.url || "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85";
}
