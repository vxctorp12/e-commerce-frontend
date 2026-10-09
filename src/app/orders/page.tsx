import { Order } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Package, CheckCircle2, ChevronRight, Clock, XCircle } from 'lucide-react';

async function getOrders(): Promise<Order[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    if (res.status === 401) {
      redirect('/auth/login');
    }
    throw new Error('Failed to fetch orders');
  }

  const json = await res.json();
  return json.data || json;
}

export default async function OrdersPage(props: { searchParams: Promise<{ success?: string }> }) {
  const searchParams = await props.searchParams;
  const isSuccess = searchParams.success === 'true';
  const orders = await getOrders();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
      case 'succeeded':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-rose-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Pagada';
      case 'pending': return 'Pendiente';
      case 'failed': return 'Fallida';
      default: return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 max-w-4xl flex-grow">
      {isSuccess && (
        <div className="mb-10 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-emerald-900 font-bold text-lg font-outfit">¡Compra exitosa!</h2>
              <p className="text-emerald-700 text-sm">Tu pago ha sido procesado por Stripe y tu orden está en camino.</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-zinc-100 text-zinc-900 rounded-xl flex items-center justify-center">
          <Package className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-bold font-outfit text-zinc-900">Historial de Compras</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white border border-zinc-100 rounded-3xl shadow-sm">
          <p className="text-zinc-500 text-lg mb-6">Aún no has realizado ninguna compra.</p>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors shadow-sm">
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-zinc-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-zinc-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-100">
                    <span className="font-outfit font-bold text-zinc-400">#{order.id}</span>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 mb-1">
                      {new Date(order.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="font-medium text-zinc-900">{getStatusText(order.status)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm text-zinc-500 mb-1">Total Pagado</p>
                  <p className="text-2xl font-bold font-outfit text-zinc-900">${Number(order.total_amount).toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">Artículos</h4>
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500">{item.quantity}x</span>
                      <span className="font-medium text-zinc-700">{item.product?.name || `Producto #${item.product_id}`}</span>
                    </div>
                    <span className="text-zinc-600">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {order.payment && (
                <div className="mt-6 pt-6 border-t border-zinc-100 flex items-center justify-between text-sm">
                  <span className="text-zinc-500 flex items-center gap-2">
                    Transacción de Stripe
                  </span>
                  <span className="font-mono text-zinc-400 text-xs bg-zinc-50 px-2 py-1 rounded-md border border-zinc-200">
                    {order.payment.stripe_payment_id}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
