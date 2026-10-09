'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { ShoppingBag, Check } from 'lucide-react';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock <= 0}
      className={`w-full py-4 rounded-xl flex items-center justify-center font-medium transition-all ${
        added 
          ? 'bg-emerald-500 text-white shadow-emerald-500/30 shadow-lg'
          : product.stock > 0 
            ? 'bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-0.5' 
            : 'bg-zinc-200 text-zinc-500 cursor-not-allowed'
      }`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5 mr-2" />
          ¡Añadido al Carrito!
        </>
      ) : product.stock > 0 ? (
        <>
          <ShoppingBag className="w-5 h-5 mr-2" />
          Añadir al Carrito
        </>
      ) : (
        'Agotado'
      )}
    </button>
  );
}
