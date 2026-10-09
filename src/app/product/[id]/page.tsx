import { Product } from '@/types';
import Image from 'next/image';
import AddToCartButton from '@/components/cart/AddToCartButton';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    next: { tags: ['products'] }
  });
  if (!res.ok) throw new Error('Product not found');
  const json = await res.json();
  return json.data || json;
}

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.id);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Link href="/" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Image Gallery */}
        <div className="relative aspect-[4/5] bg-zinc-100 rounded-3xl overflow-hidden shadow-sm">
          {product.image_url ? (
            <Image 
              src={product.image_url} 
              alt={product.name} 
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-300">
              <span className="font-outfit font-medium text-4xl tracking-widest uppercase">Aura</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-outfit text-zinc-900 mb-4">{product.name}</h1>
            <p className="text-3xl font-semibold text-zinc-900">${Number(product.price).toFixed(2)}</p>
          </div>
          
          <div className="prose prose-zinc mb-10">
            <p className="text-zinc-600 leading-relaxed text-lg">
              {product.description || 'Una pieza excepcional diseñada con la máxima atención al detalle. Perfecta para cualquier ocasión, combinando funcionalidad y estilo premium.'}
            </p>
          </div>

          <div className="mb-8">
            <p className="text-sm font-medium text-zinc-500 mb-2">Disponibilidad</p>
            {product.stock > 0 ? (
              <p className="text-emerald-600 font-medium bg-emerald-50 inline-block px-3 py-1 rounded-full text-sm">En Stock ({product.stock} unidades)</p>
            ) : (
              <p className="text-rose-600 font-medium bg-rose-50 inline-block px-3 py-1 rounded-full text-sm">Agotado</p>
            )}
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
