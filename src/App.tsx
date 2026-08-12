import { useMemo, useState } from 'react'
import { ArrowRight, Heart, Menu, Search, ShoppingBag, Sparkles, Star, Truck, X } from 'lucide-react'
import { products, Product } from './data'

type CartItem = Product & { quantity: number }
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setCartOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeCategory, setCategory] = useState('All')
  const [notice, setNotice] = useState('')
  const categories = ['All', 'Audio', 'Wearables', 'Home', 'Lifestyle']
  const visibleProducts = useMemo(() => products.filter(p => (activeCategory === 'All' || p.category === activeCategory) && p.name.toLowerCase().includes(query.toLowerCase())), [query, activeCategory])
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const addToCart = (product: Product) => { setCart(current => { const found = current.find(i => i.id === product.id); return found ? current.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) : [...current, { ...product, quantity: 1 }] }); setNotice(`${product.name} added to your bag`); setTimeout(() => setNotice(''), 2200) }
  const updateQuantity = (id: number, amount: number) => setCart(current => current.flatMap(item => item.id !== id ? [item] : item.quantity + amount > 0 ? [{ ...item, quantity: item.quantity + amount }] : []))

  return <main>
    <div className="announcement"><Truck size={15} /> Complimentary shipping on orders over $75 <span>Shop now <ArrowRight size={14} /></span></div>
    <header>
      <a className="brand" href="#top">NORTH<span>.</span></a>
      <nav><a href="#shop">Shop</a><a href="#new">New arrivals</a><a href="#story">Our story</a></nav>
      <div className="header-actions"><button aria-label="Search" onClick={() => document.querySelector<HTMLInputElement>('.search input')?.focus()}><Search size={20} /></button><button aria-label="Wishlist"><Heart size={20} /></button><button className="bag-button" aria-label="Open shopping bag" onClick={() => setCartOpen(true)}><ShoppingBag size={20} />{itemCount > 0 && <b>{itemCount}</b>}</button><button className="mobile-menu" aria-label="Menu"><Menu size={21} /></button></div>
    </header>

    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><Sparkles size={15} /> DESIGN, SIMPLIFIED</p><h1>Objects for<br /><em>everyday wonder.</em></h1><p className="intro">Thoughtfully designed essentials for the spaces and moments that matter most.</p><a className="button dark" href="#shop">Explore the collection <ArrowRight size={18} /></a></div><div className="hero-art"><div className="sun"></div><div className="arch arch-one"></div><div className="arch arch-two"></div><div className="hero-product">🎧</div><p>Sound, beautifully made.</p></div></section>

    <section className="shop-section" id="shop"><div className="section-heading"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Find your next favorite.</h2></div><a href="#shop">View all <ArrowRight size={17} /></a></div><div className="browse"><div className="category-pills">{categories.map(c => <button className={c === activeCategory ? 'active' : ''} onClick={() => setCategory(c)} key={c}>{c}</button>)}</div><label className="search"><Search size={18} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search the collection" /></label></div><div className="products">{visibleProducts.map(product => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div>{visibleProducts.length === 0 && <p className="empty">No products match that search.</p>}</section>

    <section className="values" id="story"><div><span>01</span><h3>Made to last</h3><p>Timeless design and considered materials mean less waste, more joy.</p></div><div><span>02</span><h3>Ships with care</h3><p>Every order is packed beautifully and arrives carbon neutral.</p></div><div><span>03</span><h3>Here for you</h3><p>Real people, thoughtful support, and a 30-day easy return policy.</p></div></section>
    <footer><a className="brand" href="#top">NORTH<span>.</span></a><p>Small objects. Big feeling.</p><div><a href="#shop">Instagram</a><a href="#shop">Pinterest</a><a href="#shop">Contact</a></div></footer>
    {notice && <div className="toast">{notice}</div>}
    {isCartOpen && <aside className="cart"><div className="cart-head"><h2>Your bag <small>({itemCount})</small></h2><button onClick={() => setCartOpen(false)} aria-label="Close bag"><X /></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={35}/><p>Your bag is waiting for something lovely.</p><button className="button dark" onClick={() => setCartOpen(false)}>Keep shopping</button></div> : <><div className="cart-items">{cart.map(item => <article key={item.id}><div className="cart-thumb" style={{ background: item.color }}>{item.image}</div><div><h4>{item.name}</h4><p>{money.format(item.price)}</p><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}>+</button></div></div></article>)}</div><div className="cart-total"><p><span>Subtotal</span><strong>{money.format(total)}</strong></p><small>Taxes and shipping calculated at checkout.</small><button className="button dark" onClick={() => setNotice('Checkout is ready to connect to your NestJS API.')}>Checkout <ArrowRight size={17} /></button></div></>}</aside>}
    {isCartOpen && <div className="overlay" onClick={() => setCartOpen(false)} />}
  </main>
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) { return <article className="product-card"><div className="product-visual" style={{ background: product.color }}>{product.badge && <span className="badge">{product.badge}</span>}<button className="favorite" aria-label={`Save ${product.name}`}><Heart size={18}/></button><span className="product-emoji">{product.image}</span><button className="quick-add" onClick={() => onAdd(product)}>Add to bag <ShoppingBag size={16}/></button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.category}</p></div><strong>{money.format(product.price)}</strong></div><p className="rating"><Star size={14} fill="currentColor" /> {product.rating} <span>(48)</span></p></article> }
