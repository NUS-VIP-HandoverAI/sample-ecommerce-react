export type Product = { id: number; name: string; category: string; price: number; rating: number; image: string; color: string; badge?: string }

export const products: Product[] = [
  { id: 1, name: 'Luma Wireless Headphones', category: 'Audio', price: 189, rating: 4.9, image: '🎧', color: '#DCE8E5', badge: 'Best seller' },
  { id: 2, name: 'Orbit Smart Watch', category: 'Wearables', price: 249, rating: 4.8, image: '⌚', color: '#EAE2DA', badge: 'New' },
  { id: 3, name: 'Muse Table Lamp', category: 'Home', price: 89, rating: 4.7, image: '💡', color: '#E8DED0' },
  { id: 4, name: 'Frame Mini Speaker', category: 'Audio', price: 129, rating: 4.8, image: '🔊', color: '#DEDDEC' },
  { id: 5, name: 'Arc Everyday Backpack', category: 'Lifestyle', price: 109, rating: 4.6, image: '🎒', color: '#D7E3ED' },
  { id: 6, name: 'Form Ceramic Set', category: 'Home', price: 72, rating: 4.9, image: '☕', color: '#E9DDD2', badge: 'Limited' }
]
