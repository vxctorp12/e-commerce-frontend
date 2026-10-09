'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export async function createOrderAction(items: { product_id: number; quantity: number }[], stripeToken: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return { error: 'Debes iniciar sesión para realizar la compra' };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        items,
        stripe_token: stripeToken
      })
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || data.message || 'Error al procesar la orden y el pago' };
    }

    // Revalidamos el caché de productos ya que el stock ha disminuido
    revalidateTag('products');

    return { success: true, order: data.order };
  } catch (error) {
    return { error: 'Error de conexión con el servidor al procesar el pago' };
  }
}
