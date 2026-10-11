import Link from "next/link";
import { Product } from "@/types";
import { Suspense } from "react";
import CatalogGrid from "@/components/catalog/CatalogGrid";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { tags: ['products'] }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const json = await res.json();
  return json.data || json;
}

function ProductListSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-zinc-200">
        <div>
          <div className="h-4 bg-zinc-200 rounded w-28 mb-2"></div>
          <div className="h-9 bg-zinc-200 rounded-lg w-40 mb-2"></div>
          <div className="h-4 bg-zinc-200 rounded-md w-56"></div>
        </div>
        <div className="h-10 bg-zinc-200 rounded-xl w-48"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex flex-col">
            <div className="aspect-[4/5] bg-zinc-200 rounded-xl mb-4"></div>
            <div className="h-5 bg-zinc-200 rounded-md w-3/4 mb-2"></div>
            <div className="h-5 bg-zinc-200 rounded-md w-1/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function ProductList() {
  const products = await getProducts();
  return <CatalogGrid products={products} />;
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="mb-16 relative rounded-2xl overflow-hidden bg-zinc-900 text-white p-8 md:p-16">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-outfit font-bold mb-6 leading-tight">
            Diseño Minimalista.<br/>Calidad Máxima.
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl mb-8 max-w-lg">
            Explora nuestra nueva colección de temporada. Piezas únicas creadas para destacar tu estilo.
          </p>
          <Link 
            href="#catalog" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-zinc-900 bg-white hover:bg-zinc-100 transition-colors"
          >
            Ver Colección
          </Link>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-transparent z-0"></div>
        {/* Aquí iría una imagen de fondo real premium */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-zinc-800 opacity-50 z-[-1] rounded-l-full blur-3xl transform translate-x-1/4"></div>
      </section>

      {/* Catalog - wrapped in Suspense for streaming */}
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  );
}
