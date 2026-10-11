'use client';

import { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Mail } from 'lucide-react';

interface StockNotifierProps {
  productId: number;
  productName: string;
}

export default function StockNotifier({ productId, productName }: StockNotifierProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const storageKey = `aura_stock_alert_${productId}`;

  useEffect(() => {
    // Verificar si el usuario ya se había suscrito a este producto
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setIsSubmitted(true);
        setEmail(saved);
      }
    }
  }, [storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, email);
      }
      setLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-gradient-to-br from-zinc-50 to-zinc-100/70 border border-zinc-200/80 rounded-2xl p-6 mt-6 shadow-sm">
      <div className="flex items-start gap-3.5 mb-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Bell className="w-5 h-5 text-amber-300" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-zinc-900">
            ¿Te interesa esta pieza?
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
            Actualmente está agotada, pero te notificaremos tan pronto tengamos nuevas unidades disponibles de <span className="font-medium text-zinc-700">{productName}</span>.
          </p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200/60 rounded-xl flex items-center gap-3 text-emerald-800">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs">
            <p className="font-semibold text-emerald-900">¡Alerta programada con éxito!</p>
            <p className="text-emerald-700 mt-0.5">Te avisaremos al correo <span className="font-mono">{email}</span> en cuanto ingrese stock.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-grow">
            <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2 shrink-0"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              'Avísame cuando haya stock'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
