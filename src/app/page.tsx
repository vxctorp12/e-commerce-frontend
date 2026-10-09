import Link from "next/link";
import { Product } from "@/types";
import Image from "next/image";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { tags: ['products'] }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  // Si la API tiene paginación en la raíz (tipo Laravel resource), el array suele estar en `res.json().data`
  // Asumiremos que devuelve el array directo o bajo un wrapper `data`.
  const json = await res.json();
  return json.data || json;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="mb-16 relative rounded-2xl overflow-hidden bg-zinc-900 text-white p-8 md:p-16">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-outfit font-bold mb-6 leading-tight">
            Diseño Minimalista.<br/> Calidad Máxima.
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

      {/* Catalog */}
      <section id="catalog">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-outfit text-zinc-900">Catálogo</h2>
            <p className="text-zinc-500 mt-2">Nuestros productos más recientes</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-zinc-100">
            <p className="text-zinc-500 text-lg">No hay productos disponibles por el momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 mb-4">
                  {/* Placeholder for Product Image */}
                  {product.image_url ? (
                    <Image 
                      src={product.image_url} 
                      alt={product.name} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-300 group-hover:scale-105 transition-transform duration-500 bg-gradient-to-br from-zinc-100 to-zinc-200">
                      <span className="font-outfit font-medium text-2xl tracking-widest uppercase">Aura</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 backdrop-blur text-zinc-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      Ver detalle
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-medium text-zinc-900 text-lg group-hover:text-zinc-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="mt-1 font-semibold text-zinc-900">${Number(product.price).toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
