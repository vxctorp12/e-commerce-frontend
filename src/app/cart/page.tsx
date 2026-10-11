'use client';

import { useCart } from '@/context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createOrderAction } from '@/actions/order';
import { useRouter } from 'next/navigation';
import StripeCheckoutForm from '@/components/cart/StripeCheckoutForm';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = async (paymentMethodId: string) => {
    setIsProcessing(true);
    setError(null);

    const orderItems = items.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity
    }));

    const result = await createOrderAction(orderItems, paymentMethodId);

    if (result.error) {
      setError(result.error);
      setIsProcessing(false);
    } else {
      clearCart();
      // Redirigir al historial de órdenes con confirmación de éxito
      router.push('/orders?success=true');
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="w-10 h-10 text-zinc-300" />
        </div>
        <h1 className="text-3xl font-bold font-outfit text-zinc-900 mb-4">Tu carrito está vacío</h1>
        <p className="text-zinc-500 mb-8 text-lg">Parece que aún no has agregado nada. Descubre nuestra colección exclusiva.</p>
        <Link href="/" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-zinc-900 hover:bg-zinc-800 transition-colors shadow-sm">
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 max-w-6xl">
      <h1 className="text-4xl font-bold font-outfit text-zinc-900 mb-10">Tu Carrito</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Items */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {items.map((item) => (
            <div key={item.product.id} className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
              <div className="w-full sm:w-32 aspect-square relative rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                {item.product.image_url ? (
                  <Image src={item.product.image_url} alt={item.product.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-300 font-outfit font-medium tracking-widest text-sm uppercase">Aura</div>
                )}
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-zinc-900 text-lg line-clamp-1">{item.product.name}</h3>
                    <p className="text-zinc-500 text-sm mt-1 line-clamp-2">{item.product.description}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-zinc-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 text-zinc-600 hover:text-zinc-900 disabled:opacity-50 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock} className="p-2 text-zinc-600 hover:text-zinc-900 disabled:opacity-50 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-semibold text-zinc-900 text-lg">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 sticky top-24">
            <h2 className="text-2xl font-bold font-outfit text-zinc-900 mb-6">Resumen</h2>
            
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-medium text-zinc-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Envío</span>
                <span className="font-medium text-emerald-600">Gratis</span>
              </div>
              <div className="pt-4 border-t border-zinc-200 flex justify-between text-lg font-semibold">
                <span className="text-zinc-900">Total</span>
                <span className="text-zinc-900">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-rose-50 text-rose-600 p-4 rounded-xl text-sm border border-rose-100">
                {error}
              </div>
            )}

            <Link
              href="/checkout"
              className="w-full mb-4 py-3.5 bg-zinc-900 text-white rounded-xl font-medium flex items-center justify-center hover:bg-zinc-800 transition-all shadow-sm hover:shadow text-sm"
            >
              Proceder al Checkout
            </Link>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-200"></div></div>
              <span className="relative bg-zinc-50 px-2 text-xs text-zinc-400 uppercase">O pagar aquí directamente</span>
            </div>

            <StripeCheckoutForm
              totalPrice={totalPrice}
              isProcessing={isProcessing}
              onSubmit={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
