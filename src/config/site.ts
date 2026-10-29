export const SITE_CONFIG = {
  name: 'Uttam Rasoi by Neelam',
  tagline: 'Pure Flavours. Modern Kitchen. Handcrafted with Homemaker’s Love.',
  url: 'https://uttam-rasoi-store.vercel.app',
  fssaiNumber: '13324001000492',
  supportEmail: 'care@uttamrasoi.com',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918047763021',
  whatsappDisplay: '+91 80477 63021',
  operatingHours: 'Mon-Sat 10:00 AM - 7:00 PM IST',
  social: {
    youtube: 'https://www.youtube.com/@indianyoutuberneelamvlogs',
    instagram: 'https://www.instagram.com/indianyoutuberneelam',
    facebook: 'https://www.facebook.com/indianvloggerneelam',
  },
  ogImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&h=630&q=85',
};

export const getWhatsAppLink = (message: string): string => {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
