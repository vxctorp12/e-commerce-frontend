'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { ShoppingBag, Check, Ban } from 'lucide-react';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const isOutOfStock = Number(product.stock) <= 0;

  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isOutOfStock}
      aria-disabled={isOutOfStock}
      className={`w-full py-4 rounded-xl flex items-center justify-center font-medium transition-all ${
        added 
          ? 'bg-emerald-500 text-white shadow-emerald-500/30 shadow-lg'
          : !isOutOfStock
            ? 'bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer' 
            : 'bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed select-none'
      }`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5 mr-2" />
          ¡Añadido al Carrito!
        </>
      ) : !isOutOfStock ? (
        <>
          <ShoppingBag className="w-5 h-5 mr-2" />
          Añadir al Carrito
        </>
      ) : (
        <span className="inline-flex items-center gap-2 text-zinc-400 font-semibold">
          <Ban className="w-4 h-4 text-zinc-400" />
          No disponible para compra
        </span>
      )}
    </button>
  );
}
