'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { Sparkles, CheckCircle2, Ban } from 'lucide-react';

interface CatalogGridProps {
  products: Product[];
}

type StockFilter = 'all' | 'in_stock' | 'out_of_stock';

export default function CatalogGrid({ products }: CatalogGridProps) {
  const [filter, setFilter] = useState<StockFilter>('all');

  // Aseguramos el orden óptimo: en stock primero, agotados al final
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const aInStock = Number(a.stock) > 0 ? 1 : 0;
      const bInStock = Number(b.stock) > 0 ? 1 : 0;
      return bInStock - aInStock;
    });
  }, [products]);

  // Contadores
  const inStockCount = useMemo(() => {
    return products.filter((p) => Number(p.stock) > 0).length;
  }, [products]);

  const outOfStockCount = useMemo(() => {
    return products.filter((p) => Number(p.stock) <= 0).length;
  }, [products]);

  // Filtrado reactivo
  const filteredProducts = useMemo(() => {
    if (filter === 'in_stock') {
      return sortedProducts.filter((p) => Number(p.stock) > 0);
    }
    if (filter === 'out_of_stock') {
      return sortedProducts.filter((p) => Number(p.stock) <= 0);
    }
    return sortedProducts;
  }, [sortedProducts, filter]);

  return (
    <section id="catalog" className="scroll-mt-10">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-zinc-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Colección Disponible
          </div>
          <h2 className="text-3xl font-bold font-outfit text-zinc-900">Catálogo</h2>
          <p className="text-zinc-500 text-sm mt-1">
            {products.length} productos en catálogo
            {outOfStockCount > 0 ? (
              <span className="text-zinc-400"> ({outOfStockCount} actualmente agotado)</span>
            ) : null}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Todos ({products.length})
          </button>

          <button
            onClick={() => setFilter('in_stock')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === 'in_stock'
                ? 'bg-white text-emerald-700 shadow-sm font-semibold'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Disponibles ({inStockCount})
          </button>

          {outOfStockCount > 0 && (
            <button
              onClick={() => setFilter('out_of_stock')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'out_of_stock'
                  ? 'bg-white text-rose-700 shadow-sm font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Ban className="w-3.5 h-3.5 text-rose-500" />
              Agotados ({outOfStockCount})
            </button>
          )}
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-zinc-100 p-8">
          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <Ban className="w-6 h-6" />
          </div>
          <p className="text-zinc-900 font-medium text-lg">No hay productos en esta categoría</p>
          <p className="text-zinc-500 text-sm mt-1 max-w-sm mx-auto">
            Prueba cambiando los filtros para ver todos los artículos de nuestra tienda.
          </p>
          <button
            onClick={() => setFilter('all')}
            className="mt-5 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
