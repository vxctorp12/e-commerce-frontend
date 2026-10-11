'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, ArrowRight, Lock } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

interface CheckoutFormProps {
  totalPrice: number;
  isProcessing: boolean;
  onSubmit: (paymentMethodId: string) => Promise<void>;
}

function CheckoutFormInner({ totalPrice, isProcessing, onSubmit }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;

    setIsCreatingPayment(true);
    setCardError(null);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setCardError('Error al cargar el formulario de pago');
      setIsCreatingPayment(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setCardError(error.message || 'Error al procesar la tarjeta');
      setIsCreatingPayment(false);
      return;
    }

    if (paymentMethod) {
      await onSubmit(paymentMethod.id);
    }

    setIsCreatingPayment(false);
  };

  const processing = isProcessing || isCreatingPayment;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-zinc-700 mb-3">
          Datos de tarjeta
        </label>
        <div className="p-4 border border-zinc-200 rounded-xl bg-white focus-within:ring-2 focus-within:ring-zinc-900 focus-within:border-transparent transition-shadow">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#18181b',
                  '::placeholder': { color: '#a1a1aa' },
                  fontFamily: 'Inter, system-ui, sans-serif',
                },
                invalid: { color: '#e11d48' },
              },
            }}
          />
        </div>
        <p className="mt-2 text-xs text-zinc-400 flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Usa <span className="font-mono bg-zinc-100 px-1 rounded">4242 4242 4242 4242</span> para pruebas
        </p>
      </div>

      {cardError && (
        <div className="mb-4 bg-rose-50 text-rose-600 p-3 rounded-xl text-sm border border-rose-100">
          {cardError}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-4 bg-zinc-900 text-white rounded-xl font-medium flex items-center justify-center hover:bg-zinc-800 transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
      >
        {processing ? (
          'Procesando Pago...'
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Pagar ${totalPrice.toFixed(2)}
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </button>
      <p className="text-center text-xs text-zinc-500 mt-4 flex items-center justify-center gap-1">
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
        Pagos seguros procesados por Stripe
      </p>
    </form>
  );
}

export default function StripeCheckoutForm({ totalPrice, isProcessing, onSubmit }: CheckoutFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner totalPrice={totalPrice} isProcessing={isProcessing} onSubmit={onSubmit} />
    </Elements>
  );
}
