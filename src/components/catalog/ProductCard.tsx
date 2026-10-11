import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { AlertCircle, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = Number(product.stock) <= 0;
  const isLowStock = !isOutOfStock && Number(product.stock) <= 3;

  return (
    <Link 
      href={`/product/${product.id}`} 
      className="group flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-2xl p-2 -m-2 transition-all hover:bg-white hover:shadow-lg hover:shadow-zinc-200/50"
    >
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 mb-4 border border-zinc-100">
        {/* Out of Stock & Low Stock Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {isOutOfStock ? (
            <span className="inline-flex items-center gap-1.5 bg-zinc-900/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md border border-white/10 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              Agotado
            </span>
          ) : isLowStock ? (
            <span className="inline-flex items-center gap-1 bg-amber-500/95 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
              <AlertCircle className="w-3 h-3" />
              Últimas {product.stock} un.
            </span>
          ) : null}
        </div>

        {/* Product Image */}
        {product.image_url ? (
          <Image 
            src={product.image_url} 
            alt={product.name} 
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              isOutOfStock 
                ? 'grayscale-[35%] opacity-80 group-hover:grayscale-0 group-hover:opacity-100' 
                : ''
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-300 group-hover:scale-105 transition-transform duration-500 bg-gradient-to-br from-zinc-100 to-zinc-200">
            <span className="font-outfit font-medium text-2xl tracking-widest uppercase">Aura</span>
          </div>
        )}

        {/* Action badge on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-zinc-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
            <Eye className="w-3.5 h-3.5 text-zinc-600" />
            {isOutOfStock ? 'Ver detalles' : 'Ver producto'}
          </span>
        </div>
      </div>

      {/* Card Info */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-medium text-zinc-900 text-lg group-hover:text-zinc-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <div className="mt-1.5 flex items-center justify-between">
          <p className="font-semibold text-zinc-900 text-base">
            ${Number(product.price).toFixed(2)}
          </p>

          {isOutOfStock ? (
            <span className="text-xs font-medium text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md">
              Sin stock
            </span>
          ) : (
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Disponible
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
