import { Product } from '@/types';
import ProductCard from '@/components/catalog/ProductCard';
import { Sparkles } from 'lucide-react';

interface RelatedProductsProps {
  currentProductId: number;
  products: Product[];
  title?: string;
}

export default function RelatedProducts({ 
  currentProductId, 
  products,
  title = "Alternativas disponibles para ti"
}: RelatedProductsProps) {
  // Filtrar el producto actual y priorizar productos que sí tengan stock
  const availableAlternatives = products
    .filter((p) => p.id !== currentProductId && Number(p.stock) > 0)
    .slice(0, 4);

  if (availableAlternatives.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-zinc-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            Stock Inmediato
          </div>
          <h2 className="text-2xl font-bold font-outfit text-zinc-900">{title}</h2>
          <p className="text-zinc-500 text-sm mt-1">Explora otras opciones listas para envío</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {availableAlternatives.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
