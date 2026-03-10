import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { products } from '@/data/mock-data';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
}

export default function OrderProducts() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (p: typeof products[0], qty: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.productId === p.id);
      if (existing) {
        return prev.map(c => c.productId === p.id ? { ...c, qty: c.qty + qty } : c);
      }
      return [...prev, { productId: p.id, name: p.name, price: p.price, qty }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(c => c.productId === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
  };

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  if (orderPlaced) {
    return (
      <>
        <TopBar title="Order Products" />
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <ShoppingCart className="h-8 w-8 text-success" />
          </div>
          <p className="text-lg font-semibold text-foreground">Order #ORD-0092 placed!</p>
          <p className="mt-1 text-sm text-muted-foreground">Estimated delivery: March 12</p>
          <button onClick={() => { setOrderPlaced(false); setCart([]); setShowCheckout(false); }} className="mt-6 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground tap-target">
            Continue Shopping
          </button>
        </div>
      </>
    );
  }

  if (showCheckout) {
    return (
      <>
        <TopBar title="Checkout" />
        <div className="p-4 space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Order Summary</h3>
            {cart.map(c => (
              <div key={c.productId} className="flex items-center justify-between py-1">
                <span className="text-sm text-foreground">{c.qty}× {c.name}</span>
                <span className="text-sm font-medium text-foreground">${(c.price * c.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="mt-2 border-t pt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Total</span>
              <span className="text-lg font-bold text-foreground">${total.toLocaleString()}</span>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm font-medium text-foreground">Payment</p>
            <div className="mt-2 flex items-center gap-3 rounded-lg border p-3">
              <div className="h-8 w-12 rounded bg-muted" />
              <span className="text-sm text-foreground">Visa ····4242</span>
              <StatusBadge variant="success">Default</StatusBadge>
            </div>
          </div>

          <button onClick={() => setOrderPlaced(true)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">
            Place Order — ${total.toLocaleString()}
          </button>
          <button onClick={() => setShowCheckout(false)} className="w-full text-center text-xs text-muted-foreground tap-target">← Back to cart</button>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Order Products" />
      <div className="space-y-4 p-4">
        {/* Usual Order */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-medium text-primary">Your usual order</p>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-sm text-foreground">24× MedGlide Pro 100mL — $1,152</p>
            <button onClick={() => addToCart(products[0], 24)} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground tap-target">Add</button>
          </div>
        </div>

        {/* Product Cards */}
        {products.map(p => {
          const inCart = cart.find(c => c.productId === p.id);
          return (
            <div key={p.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{p.name}</p>
                    {p.tag && <StatusBadge variant={p.tag === 'New' ? 'info' : 'success'}>{p.tag}</StatusBadge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{p.sku} · ${p.price}/{p.unit}</p>
                </div>
                <StatusBadge variant={p.status === 'OK' ? 'success' : p.status === 'Low' ? 'warning' : 'danger'}>
                  {p.status === 'OK' ? 'In Stock' : p.status}
                </StatusBadge>
              </div>
              <div className="mt-3 flex items-center gap-3">
                {inCart ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(p.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-full border tap-target"><Minus className="h-4 w-4" /></button>
                    <span className="w-8 text-center text-sm font-medium">{inCart.qty}</span>
                    <button onClick={() => updateQty(p.id, 1)} className="flex h-8 w-8 items-center justify-center rounded-full border tap-target"><Plus className="h-4 w-4" /></button>
                  </div>
                ) : (
                  <button onClick={() => addToCart(p, 1)} className="rounded-lg border px-4 py-2 text-xs font-medium text-foreground tap-target active:bg-muted">Add to Cart</button>
                )}
              </div>
            </div>
          );
        })}

        <AIInsightCard>Doctors with similar volume also order the OR Kit.</AIInsightCard>

        {/* Auto-reorder */}
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-reorder</p>
              <p className="text-xs text-muted-foreground">Reorder automatically every 3 weeks</p>
            </div>
            <input type="checkbox" className="h-5 w-5 rounded" />
          </div>
        </div>
      </div>

      {/* Sticky cart bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 z-20 border-t bg-background p-4 md:bottom-0">
          <button onClick={() => setShowCheckout(true)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">
            {cart.length} items · ${total.toLocaleString()} · Checkout →
          </button>
        </div>
      )}
    </>
  );
}
