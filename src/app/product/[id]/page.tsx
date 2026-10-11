import { Product } from '@/types';
import Image from 'next/image';
import AddToCartButton from '@/components/cart/AddToCartButton';
import StockNotifier from '@/components/product/StockNotifier';
import RelatedProducts from '@/components/product/RelatedProducts';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

export const instant = false;

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    next: { tags: ['products'] }
  });
  if (!res.ok) throw new Error('Product not found');
  const json = await res.json();
  return json.data || json;
}

async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      next: { tags: ['products'] }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || json;
  } catch {
    return [];
  }
}

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [product, allProducts] = await Promise.all([
    getProduct(params.id),
    getAllProducts(),
  ]);

  const isOutOfStock = Number(product.stock) <= 0;
  const isLowStock = !isOutOfStock && Number(product.stock) <= 3;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Link 
        href="/" 
        className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="relative aspect-[4/5] bg-zinc-100 rounded-3xl overflow-hidden shadow-sm border border-zinc-100">
          {/* Out of Stock Ribbon / Badge */}
          {isOutOfStock && (
            <div className="absolute top-5 left-5 z-10">
              <span className="inline-flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg border border-white/10 tracking-wide">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                Agotado temporalmente
              </span>
            </div>
          )}

          {product.image_url ? (
            <Image 
              src={product.image_url} 
              alt={product.name} 
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover ${
                isOutOfStock ? 'grayscale-[25%] opacity-85' : ''
              }`}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-300">
              <span className="font-outfit font-medium text-4xl tracking-widest uppercase">Aura</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-outfit text-zinc-900 mb-3 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-4">
              <p className="text-3xl font-semibold text-zinc-900">${Number(product.price).toFixed(2)}</p>
              {isOutOfStock && (
                <span className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full">
                  Sin unidades
                </span>
              )}
            </div>
          </div>
          
          <div className="prose prose-zinc mb-8">
            <p className="text-zinc-600 leading-relaxed text-base sm:text-lg">
              {product.description || 'Una pieza excepcional diseñada con la máxima atención al detalle. Perfecta para cualquier ocasión, combinando funcionalidad y estilo premium.'}
            </p>
          </div>

          {/* Availability Status */}
          <div className="mb-8 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
            <p className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-2">Disponibilidad</p>
            {isOutOfStock ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-sm font-semibold text-rose-700">Agotado temporalmente</span>
                </div>
                <span className="text-xs text-zinc-500">Sin stock para despacho inmediato</span>
              </div>
            ) : isLowStock ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-sm font-semibold text-amber-800">
                    ¡Pocas unidades! ({product.stock} restantes)
                  </span>
                </div>
                <span className="text-xs text-amber-600 font-medium">¡Ordena pronto antes de que se agote!</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-800">
                    En Stock ({product.stock} unidades disponibles)
                  </span>
                </div>
                <span className="text-xs text-emerald-600 font-medium">Listo para enviar hoy</span>
              </div>
            )}
          </div>

          {/* Action button */}
          <AddToCartButton product={product} />

          {/* Restock Notification Form when out of stock */}
          {isOutOfStock && (
            <StockNotifier 
              productId={product.id} 
              productName={product.name} 
            />
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-zinc-100 text-xs text-zinc-500">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>Envío seguro y rastreo garantizado</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>Garantía de calidad Aura</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended in-stock alternatives */}
      <RelatedProducts 
        currentProductId={product.id} 
        products={allProducts} 
        title={isOutOfStock ? "Alternativas con stock disponible" : "También te podría interesar"}
      />
    </div>
  );
}
