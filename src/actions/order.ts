'use server';

import { cookies } from 'next/headers';
import { revalidatePath, revalidateTag } from 'next/cache';

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
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        items,
        stripe_token: stripeToken
      })
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      const text = await res.text();
      console.error('Raw response from API:', text);
      return { error: 'Error del servidor (500). Revisa los logs de Laravel.' };
    }

    if (!res.ok) {
      return { error: data.details || data.error || data.message || 'Error al procesar la orden y el pago' };
    }

    // Revalidamos el caché de productos y las rutas para evitar interfaces desactualizadas
    revalidateTag('products', 'max');
    revalidatePath('/orders');
    revalidatePath('/');

    return { success: true, order: data.order };
  } catch (error) {
    return { error: 'Error de conexión con el servidor al procesar el pago' };
  }
}
