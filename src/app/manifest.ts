import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Uttam Rasoi by Neelam',
    short_name: 'Uttam Rasoi',
    description: '100% Pure, Stone-Ground Indian Spices, Pre-Seasoned Cast Iron Cookware & Aesthetic Kitchen Storage',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFBF7',
    theme_color: '#C85A32',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
