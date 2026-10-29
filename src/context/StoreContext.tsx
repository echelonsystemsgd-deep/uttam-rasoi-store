'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, RecipeVlog, OrderDetails, PincodeInfo } from '../types';
import { PRODUCTS, PINCODES_DATA } from '../data/products';
import confetti from 'canvas-confetti';

interface Coupon {
  code: string;
  description: string;
  discountPercent?: number;
  flatDiscount?: number;
  minOrder?: number;
}

const AVAILABLE_COUPONS: Record<string, Coupon> = {
  NEELAM10: { code: 'NEELAM10', description: '10% OFF for Neelam’s Vlog Family', discountPercent: 10 },
  FIRSTSWAD: { code: 'FIRSTSWAD', description: 'Flat ₹50 OFF on your first pure kitchen order', flatDiscount: 50, minOrder: 399 },
  FESTIVE15: { code: 'FESTIVE15', description: '15% OFF on orders above ₹999', discountPercent: 15, minOrder: 999 },
};

interface Toast {
  id: string;
  title: string;
  subtitle?: string;
  type: 'success' | 'info' | 'warning';
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isPincodeModalOpen: boolean;
  setIsPincodeModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  recipeModalVlog: RecipeVlog | null;
  setRecipeModalVlog: (vlog: RecipeVlog | null) => void;
  activePolicy: 'shipping' | 'returns' | 'privacy' | null;
  setActivePolicy: (policy: 'shipping' | 'returns' | 'privacy' | null) => void;
  
  // Cart Actions
  addToCart: (product: Product, variantIndex?: number, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Pricing & Calculations
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  orderNote: string;
  setOrderNote: (note: string) => void;

  // Pincode & Delivery
  pincode: string;
  pincodeInfo: PincodeInfo;
  updatePincode: (pin: string) => boolean;

  // Toast & Notifications
  toasts: Toast[];
  showToast: (title: string, subtitle?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Order Placement
  latestOrder: OrderDetails | null;
  setLatestOrder: (order: OrderDetails | null) => void;
  completeOrder: (orderDetails: Omit<OrderDetails, 'orderId' | 'createdAt' | 'estimatedDeliveryDate'>) => OrderDetails;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [recipeModalVlog, setRecipeModalVlog] = useState<RecipeVlog | null>(null);
  const [activePolicy, setActivePolicy] = useState<'shipping' | 'returns' | 'privacy' | null>(null);
  const [orderNote, setOrderNote] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [latestOrder, setLatestOrder] = useState<OrderDetails | null>(null);

  // Delivery pincode state
  const [pincode, setPincodeState] = useState('110001');
  const [pincodeInfo, setPincodeInfo] = useState<PincodeInfo>({
    pincode: '110001',
    city: 'New Delhi (Connaught Place)',
    state: 'Delhi NCR',
    deliveryDays: 'Tomorrow (Express 24h)',
    codAvailable: true,
    expressAvailable: true,
  });

  // Load persisted state from localStorage safely in browser
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('ur_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('ur_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedPin = localStorage.getItem('ur_pincode');
      if (savedPin) {
        updatePincode(savedPin);
      }
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ur_cart', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ur_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist]);

  // Universal body scroll lock when ANY modal or drawer is active
  useEffect(() => {
    const isModalOpen =
      isCartOpen ||
      isCheckoutOpen ||
      isPincodeModalOpen ||
      quickViewProduct !== null ||
      recipeModalVlog !== null ||
      activePolicy !== null;

    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isCartOpen, isCheckoutOpen, isPincodeModalOpen, quickViewProduct, recipeModalVlog, activePolicy]);

  const showToast = (title: string, subtitle?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: Toast = { id, title, subtitle, type };
    setToasts((prev) => [...prev.slice(-3), newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, variantIndex: number = 0, qty: number = 1) => {
    const variant = product.variants[variantIndex] || product.variants[0];
    const cartItemId = `${product.id}-${variant.id}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            productId: product.id,
            productName: product.name,
            variantId: variant.id,
            weight: variant.weight,
            price: variant.price,
            originalPrice: variant.originalPrice,
            quantity: qty,
            image: product.images[0],
            isVeg: product.isVeg,
          },
        ];
      }
    });

    showToast(`Added ${product.name}`, `${variant.weight} added to your cart`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      showToast(`Removed from cart`, item.productName, 'info');
    }
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', product?.name, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist ❤️', product?.name, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const updatePincode = (pin: string): boolean => {
    const trimmed = pin.trim();
    if (trimmed.length !== 6 || !/^\d{6}$/.test(trimmed)) {
      return false;
    }
    setPincodeState(trimmed);
    try {
      localStorage.setItem('ur_pincode', trimmed);
    } catch {}

    const known = PINCODES_DATA[trimmed];
    if (known) {
      setPincodeInfo({
        pincode: trimmed,
        city: known.city,
        state: known.state,
        deliveryDays: known.days,
        codAvailable: true,
        expressAvailable: true,
      });
    } else {
      setPincodeInfo({
        pincode: trimmed,
        city: 'India Delivery Zone',
        state: 'Standard Region',
        deliveryDays: '3-4 Business Days',
        codAvailable: true,
        expressAvailable: false,
      });
    }
    return true;
  };

  // Financial calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      discountAmount = Math.min(appliedCoupon.flatDiscount, subtotal);
    }
  }

  const freeShippingThreshold = 499;
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 60;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const applyCoupon = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    setCouponError(null);

    const coupon = AVAILABLE_COUPONS[upper];
    if (!coupon) {
      setCouponError('Invalid coupon code. Try NEELAM10 or FIRSTSWAD');
      return false;
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
      setCouponError(`Min order of ₹${coupon.minOrder} required for ${upper}`);
      return false;
    }

    setAppliedCoupon(coupon);
    showToast(`🎉 Coupon ${upper} applied!`, coupon.description, 'success');

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {}

    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
    showToast('Coupon removed', undefined, 'info');
  };

  const completeOrder = (orderDetails: Omit<OrderDetails, 'orderId' | 'createdAt' | 'estimatedDeliveryDate'>): OrderDetails => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `UR-${randomNum}`;
    const now = new Date();
    
    // Estimate delivery date (3 days out)
    const delDate = new Date();
    delDate.setDate(delDate.getDate() + 3);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const estimatedDeliveryDate = delDate.toLocaleDateString('en-IN', options);

    const finalOrder: OrderDetails = {
      ...orderDetails,
      orderId,
      createdAt: now.toISOString(),
      estimatedDeliveryDate,
    };

    setLatestOrder(finalOrder);
    clearCart();
    setAppliedCoupon(null);
    setOrderNote('');

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {}

    return finalOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isPincodeModalOpen,
        setIsPincodeModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        recipeModalVlog,
        setRecipeModalVlog,
        activePolicy,
        setActivePolicy,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        subtotal,
        discountAmount,
        deliveryFee,
        total,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        orderNote,
        setOrderNote,
        pincode,
        pincodeInfo,
        updatePincode,
        toasts,
        showToast,
        removeToast,
        latestOrder,
        setLatestOrder,
        completeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
