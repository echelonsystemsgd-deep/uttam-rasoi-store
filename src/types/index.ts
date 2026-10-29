export interface ProductVariant {
  id: string;
  weight: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  tagline: string;
  category: 'pure-spices' | 'signature-masalas' | 'kitchen-organization' | 'gift-bundles';
  categoryLabel: string;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  isVeg: boolean;
  images: string[];
  variants: ProductVariant[];
  selectedVariantIndex?: number;
  description: string;
  origin: string;
  processingMethod: string;
  keyIngredients: string[];
  neelamTip: string;
  fssaiNumber: string;
  shelfLife: string;
}

export interface CartItem {
  id: string; // `${productId}-${variantId}`
  productId: string;
  productName: string;
  variantId: string;
  weight: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  isVeg: boolean;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  verifiedBuyer: boolean;
  title: string;
  comment: string;
  dishCooked: string;
  dishImage?: string;
  productName: string;
}

export interface RecipeVlog {
  id: string;
  title: string;
  thumbnail: string;
  videoDuration: string;
  views: string;
  recipeName: string;
  description: string;
  youtubeId: string;
  featuredProductIds: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
  instructions: string[];
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'upi' | 'cod' | 'card' | 'netbanking';
  upiApp?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountAmount?: number;
  couponCode?: string;
  deliveryFee: number;
  total: number;
  createdAt: string;
  estimatedDeliveryDate: string;
}

export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  deliveryDays: string;
  codAvailable: boolean;
  expressAvailable: boolean;
}
