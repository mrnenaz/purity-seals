export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  rating: number;
  category: string;
  imageUrl?: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "adeptus-mechanicus-seal",
    name: "Adeptus Mechanicus Purity Seal",
    price: "0.00",
    description:
      "Стандартный Когнитивный Догмат Адептус Механикус —сертифицированная сургучная печать и пергамент из архивов Марса—",
    rating: 5,
    category: "Space Marines",
    featured: true,
    imageUrl: "/Мех.jpg",
  },
  {
    id: "imperial-fists-seal",
    name: "Imperial Fists Purity Seal",
    price: "0.00",
    description:
      "Стандартный Знак Чистоты Имперских Кулаков —сургучная печать с символом Ордена и пергамент, одобренный Дорном—",
    rating: 4,
    category: "Space Marines",
    featured: true,
    imageUrl: "/Кулак.jpg",
  },
  {
    id: "chaplain-seal",
    name: "Chaplain's Blessing Seal",
    price: "49.99",
    description:
      "Ornate seal with prayers inscribed by Chaplains of the Adeptus Astartes",
    rating: 5,
    category: "Space Marines",
    featured: true,
    imageUrl: "/Гидра.jpg",
  },
  {
    id: "chaos-mech",
    name: "Imperial Guard Merit Seal",
    price: "29.99",
    description:
      "Standard issue seal awarded to distinguished members of the Astra Militarum",
    rating: 4,
    category: "Imperial Guard",
    imageUrl: "/chaos-mech.jpg",
  },
  {
    id: "chaos-fist",
    name: "Adeptus Mechanicus Binary Seal",
    price: "44.99",
    description:
      "Techno-arcane seal with machine prayers to appease machine spirits",
    rating: 5,
    category: "Adeptus Mechanicus",
    imageUrl: "/chaos-fist.jpg",
  },
  {
    id: "chaos-temp",
    name: "Sisters of Battle Devotional Seal",
    price: "42.99",
    description:
      "Ornate seal bearing the symbols of the Adepta Sororitas and prayers to the Emperor",
    rating: 5,
    category: "Adepta Sororitas",
    imageUrl: "/chaos-temp.jpg",
  },
  {
    id: "commissar-seal",
    name: "Commissar Authority Seal",
    price: "34.99",
    description:
      "Seal denoting the authority of Imperial Commissars to maintain discipline",
    rating: 4,
    category: "Imperial Guard",
    imageUrl: "/chaos-red.jpg",
  },
  {
    id: "primaris-seal",
    name: "Primaris Marine Combat Seal",
    price: "45.99",
    description:
      "Modern seal designed for the Emperor's newest Space Marine warriors",
    rating: 5,
    category: "Space Marines",
    imageUrl: "/chaos-black.jpg",
  },
  // {
  //   id: "custodes-seal",
  //   name: "Adeptus Custodes Golden Seal",
  //   price: "79.99",
  //   description:
  //     "Exquisite gold-plated seal worn by the Emperor's personal guardians",
  //   rating: 5,
  //   category: "Adeptus Custodes",
  // },
];

export const categories = [
  "All",
  "Space Marines",
  "Inquisition",
  "Imperial Guard",
  "Adeptus Mechanicus",
  "Adepta Sororitas",
  "Adeptus Custodes",
];
