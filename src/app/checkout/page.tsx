'use client';

import { useCart } from '@/context/CartContext';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createOrderAction } from '@/actions/order';
import { useRouter } from 'next/navigation';
import StripeCheckoutForm from '@/components/cart/StripeCheckoutForm';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

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
        <h1 className="text-3xl font-bold font-outfit text-zinc-900 mb-4">No hay productos para pagar</h1>
        <p className="text-zinc-500 mb-8 text-lg">Agrega artículos desde el catálogo para proceder con el pago.</p>
        <Link href="/" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-zinc-900 hover:bg-zinc-800 transition-colors shadow-sm">
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 max-w-4xl">
      <Link 
        href="/cart" 
        className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Volver al carrito
      </Link>

      <h1 className="text-4xl font-bold font-outfit text-zinc-900 mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Resumen del pedido */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold font-outfit text-zinc-900">Resumen del Pedido</h2>
          
          <div className="divide-y divide-zinc-100 max-h-80 overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.product.id} className="py-3 flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-zinc-800">{item.product.name}</p>
                  <p className="text-zinc-400 text-xs">{item.quantity} x ${Number(item.product.price).toFixed(2)}</p>
                </div>
                <span className="font-semibold text-zinc-900">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-100 space-y-2 text-sm">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span className="font-medium text-zinc-900">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Envío</span>
              <span className="font-medium text-emerald-600">Gratis</span>
            </div>
            <div className="pt-3 border-t border-zinc-200 flex justify-between text-lg font-bold text-zinc-900">
              <span>Total a pagar</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Formulario de Pago */}
        <div className="bg-zinc-50 rounded-3xl p-6 md:p-8 border border-zinc-100">
          <h2 className="text-xl font-bold font-outfit text-zinc-900 mb-6">Información de Pago</h2>

          {error && (
            <div className="mb-6 bg-rose-50 text-rose-600 p-4 rounded-xl text-sm border border-rose-100">
              {error}
            </div>
          )}

          <StripeCheckoutForm
            totalPrice={totalPrice}
            isProcessing={isProcessing}
            onSubmit={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
