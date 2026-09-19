/**
 * Restaurant Menu Data Catalog
 * Source of Truth from user specifications and reference images
 */

export const MENU_CATEGORIES = [
  { id: 'all', name: 'All', iconType: 'grid' },
  { id: 'biryani', name: 'Biryani', image: '/menu_assets/categories/biryani.png' },
  { id: 'chicken_special', name: 'Chicken Special', image: '/menu_assets/categories/chicken_special.png' },
  { id: 'paneer_special', name: 'Paneer Special', image: '/menu_assets/categories/paneer_special.png' },
  { id: 'mushroom_special', name: 'Mushroom Special', image: '/menu_assets/categories/mushroom_special.png' },
  { id: 'egg_special', name: 'Egg Special', image: '/menu_assets/categories/egg_special.png' },
  { id: 'veg_special', name: 'Veg Special', image: '/menu_assets/categories/veg_special.png' },
  { id: 'chinese', name: 'Chinese', image: '/menu_assets/categories/chinese.png' },
  { id: 'starters', name: 'Starters', image: '/menu_assets/categories/starters.png' },
  { id: 'combos', name: 'Combos', image: '/menu_assets/categories/combos.png' },
  { id: 'desserts', name: 'Desserts', image: '/menu_assets/categories/desserts.png' },
  { id: 'beverages', name: 'Beverages', image: '/menu_assets/categories/beverages.png' }
];

export const MENU_ITEMS = [
  // --- BIRYANI ---
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    category: 'biryani',
    dietary: 'non-veg',
    description: 'Fragrant rice with tender chicken and aromatic spices.',
    rating: 4.5,
    reviews: 320,
    image: '/menu_assets/dishes/chicken_biryani.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 150, default: true },
      { label: 'Half', price: 80 }
    ],
    defaultPrice: 150,
    popularity: 99
  },
  {
    id: 'mutton-biryani',
    name: 'Mutton Biryani',
    category: 'biryani',
    dietary: 'non-veg',
    description: 'Rich and flavorful mutton cooked to perfection.',
    rating: 4.6,
    reviews: 184,
    image: '/menu_assets/dishes/mutton_biryani.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 210, default: true },
      { label: 'Half', price: 110 }
    ],
    defaultPrice: 210,
    popularity: 95
  },
  {
    id: 'egg-biryani',
    name: 'Egg Biryani',
    category: 'biryani',
    dietary: 'non-veg',
    description: 'Delicious blend of eggs and traditional spices.',
    rating: 4.4,
    reviews: 210,
    image: '/menu_assets/dishes/egg_biryani.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 100, default: true },
      { label: 'Half', price: 60 }
    ],
    defaultPrice: 100,
    popularity: 88
  },
  {
    id: 'veg-biryani',
    name: 'Veg Biryani',
    category: 'biryani',
    dietary: 'veg',
    description: 'Aromatic rice with fresh vegetables and herbs.',
    rating: 4.3,
    reviews: 176,
    image: '/menu_assets/dishes/veg_biryani.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 100, default: true },
      { label: 'Half', price: 60 }
    ],
    defaultPrice: 100,
    popularity: 84
  },

  // --- CHICKEN SPECIAL ---
  {
    id: 'chicken-lollipop',
    name: 'Chicken Lollipop',
    category: 'chicken_special',
    dietary: 'non-veg',
    description: 'Crispy, juicy and full of flavour.',
    rating: 4.5,
    reviews: 98,
    image: '/menu_assets/dishes/chicken_lollipop.png',
    hasVariants: true,
    variants: [
      { label: '4 pc', price: 200, default: true },
      { label: '8 pc', price: 350 }
    ],
    defaultPrice: 200,
    popularity: 94
  },
  {
    id: 'chicken-chilli',
    name: 'Chicken Chilli',
    category: 'chicken_special',
    dietary: 'non-veg',
    description: 'Spicy, tangy and irresistibly good.',
    rating: 4.4,
    reviews: 142,
    image: '/menu_assets/dishes/chicken_chilli.png',
    hasVariants: false,
    defaultPrice: 150,
    popularity: 92
  },
  {
    id: 'chicken-65',
    name: 'Chicken 65',
    category: 'chicken_special',
    dietary: 'non-veg',
    description: 'A classic favorite, crispy and spicy.',
    rating: 4.4,
    reviews: 188,
    image: '/menu_assets/dishes/chicken_65.png',
    hasVariants: false,
    defaultPrice: 150,
    popularity: 93
  },
  {
    id: 'chicken-manchurian',
    name: 'Chicken Manchurian',
    category: 'chicken_special',
    dietary: 'non-veg',
    description: 'Indo-Chinese classic with bold flavours.',
    rating: 4.3,
    reviews: 167,
    image: '/menu_assets/dishes/chicken_manchurian.png',
    hasVariants: false,
    defaultPrice: 150,
    popularity: 89
  },
  {
    id: 'chicken-pakoda',
    name: 'Chicken Pakoda',
    category: 'chicken_special',
    dietary: 'non-veg',
    description: 'Golden spiced chicken fritters, crispy on the outside and tender inside.',
    rating: 4.5,
    reviews: 82,
    image: '/menu_assets/categories/starters.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 100, default: true },
      { label: 'Half', price: 60 }
    ],
    defaultPrice: 100,
    popularity: 86
  },
  {
    id: 'paper-chicken',
    name: 'Paper Chicken',
    category: 'chicken_special',
    dietary: 'non-veg',
    description: 'Crispy thin chicken bites tossed in fragrant spices and herbs.',
    rating: 4.4,
    reviews: 65,
    image: '/menu_assets/dishes/chicken_chilli.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 120, default: true },
      { label: 'Half', price: 70 }
    ],
    defaultPrice: 120,
    popularity: 81
  },

  // --- PANEER SPECIAL ---
  {
    id: 'masala-paneer',
    name: 'Masala Paneer',
    category: 'paneer_special',
    dietary: 'veg',
    description: 'Soft paneer cubes in rich spiced gravy.',
    rating: 4.5,
    reviews: 120,
    image: '/menu_assets/dishes/masala_paneer.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 150, default: true },
      { label: 'Half', price: 80 }
    ],
    defaultPrice: 150,
    popularity: 91
  },
  {
    id: 'paneer-chilli',
    name: 'Paneer Chilli',
    category: 'paneer_special',
    dietary: 'veg',
    description: 'A spicy Indo-Chinese delight.',
    rating: 4.4,
    reviews: 96,
    image: '/menu_assets/dishes/paneer_chilli.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 150, default: true },
      { label: 'Half', price: 80 }
    ],
    defaultPrice: 150,
    popularity: 90
  },
  {
    id: 'paneer-pakoda',
    name: 'Paneer Pakoda',
    category: 'paneer_special',
    dietary: 'veg',
    description: 'Soft cottage cheese dipped in seasoned gram flour batter and fried golden.',
    rating: 4.3,
    reviews: 74,
    image: '/menu_assets/categories/paneer_special.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 100, default: true },
      { label: 'Half', price: 60 }
    ],
    defaultPrice: 100,
    popularity: 83
  },
  {
    id: 'paneer-manchurian',
    name: 'Paneer Manchurian',
    category: 'paneer_special',
    dietary: 'veg',
    description: 'Succulent paneer cubes tossed in rich ginger-garlic Manchurian sauce.',
    rating: 4.4,
    reviews: 86,
    image: '/menu_assets/categories/paneer_special.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 150, default: true },
      { label: 'Half', price: 80 }
    ],
    defaultPrice: 150,
    popularity: 87
  },
  {
    id: 'paper-paneer',
    name: 'Paper Paneer',
    category: 'paneer_special',
    dietary: 'veg',
    description: 'Thin crispy marinated paneer slices tossed with bell peppers and wok spices.',
    rating: 4.3,
    reviews: 50,
    image: '/menu_assets/dishes/paneer_chilli.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 120, default: true },
      { label: 'Half', price: 70 }
    ],
    defaultPrice: 120,
    popularity: 79
  },

  // --- MUSHROOM SPECIAL ---
  {
    id: 'mushroom-chilli',
    name: 'Mushroom Chilli',
    category: 'mushroom_special',
    dietary: 'veg',
    description: 'Fresh mushrooms in a tangy sauce.',
    rating: 4.3,
    reviews: 88,
    image: '/menu_assets/dishes/mushroom_chilli.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 150, default: true },
      { label: 'Half', price: 80 }
    ],
    defaultPrice: 150,
    popularity: 87
  },
  {
    id: 'mushroom-masala',
    name: 'Mushroom Masala',
    category: 'mushroom_special',
    dietary: 'veg',
    description: 'Button mushrooms simmered in an aromatic onion-tomato spiced curry.',
    rating: 4.4,
    reviews: 70,
    image: '/menu_assets/categories/mushroom_special.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 150, default: true },
      { label: 'Half', price: 80 }
    ],
    defaultPrice: 150,
    popularity: 84
  },
  {
    id: 'mushroom-pakoda',
    name: 'Mushroom Pakoda',
    category: 'mushroom_special',
    dietary: 'veg',
    description: 'Crispy deep-fried battered mushrooms served with special house dip.',
    rating: 4.2,
    reviews: 45,
    image: '/menu_assets/categories/starters.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 100, default: true },
      { label: 'Half', price: 60 }
    ],
    defaultPrice: 100,
    popularity: 78
  },
  {
    id: 'mushroom-manchurian',
    name: 'Mushroom Manchurian',
    category: 'mushroom_special',
    dietary: 'veg',
    description: 'Plump mushrooms tossed in fiery dark soya and garlic sauce.',
    rating: 4.3,
    reviews: 62,
    image: '/menu_assets/categories/chinese.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 150, default: true },
      { label: 'Half', price: 80 }
    ],
    defaultPrice: 150,
    popularity: 82
  },

  // --- EGG SPECIAL ---
  {
    id: 'egg-kadhi',
    name: 'Egg Kadhi',
    category: 'egg_special',
    dietary: 'non-veg',
    description: 'A comforting blend of eggs in creamy kadhi.',
    rating: 4.2,
    reviews: 64,
    image: '/menu_assets/dishes/egg_kadhi.png',
    hasVariants: true,
    variants: [
      { label: '4 pc', price: 100, default: true },
      { label: 'Half', price: 60 }
    ],
    defaultPrice: 100,
    popularity: 85
  },
  {
    id: 'egg-omlet',
    name: 'Egg Omlet',
    category: 'egg_special',
    dietary: 'non-veg',
    description: 'Dual egg classic omelet spiced with green chillies, coriander and onions.',
    rating: 4.3,
    reviews: 95,
    image: '/menu_assets/categories/egg_special.png',
    hasVariants: false,
    defaultPrice: 40,
    popularity: 88
  },

  // --- VEG SPECIAL ---
  {
    id: 'veg-manchurian',
    name: 'Veg Manchurian',
    category: 'veg_special',
    dietary: 'veg',
    description: 'Finely minced vegetable dumplings simmered in savory Chinese sauce.',
    rating: 4.4,
    reviews: 91,
    image: '/menu_assets/dishes/veg_manchurian.png',
    hasVariants: true,
    variants: [
      { label: 'Full', price: 120, default: true },
      { label: 'Half', price: 70 }
    ],
    defaultPrice: 120,
    popularity: 86
  }
];

export const RESTAURANT_INFO = {
  name: 'Biryani & Chinese District',
  tagline: 'Biryani Meets A Bigger World',
  headline: 'GREAT FOOD • BOLDER FLAVOURS • ALWAYS HERE',
  address: 'Meherma Barahat Pirpanti Road, Near Purana Naaz Cinema Hall',
  city: 'Meherma',
  hours: '11:00 AM – 11:30 PM Daily',
  phone: '+91 98765 43210'
};
