export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                A
              </div>
              <span className="font-outfit font-semibold text-xl tracking-tight">Aura</span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Elevando tu estilo de vida con productos de diseño excepcional y calidad premium.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 mb-4 font-outfit">Comprar</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/" className="hover:text-zinc-900 transition-colors">Catálogo</Link></li>
              <li><Link href="/categories" className="hover:text-zinc-900 transition-colors">Categorías</Link></li>
              <li><Link href="/offers" className="hover:text-zinc-900 transition-colors">Ofertas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 mb-4 font-outfit">Soporte</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/faq" className="hover:text-zinc-900 transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="/shipping" className="hover:text-zinc-900 transition-colors">Envíos y Devoluciones</Link></li>
              <li><Link href="/contact" className="hover:text-zinc-900 transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 mb-4 font-outfit">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/terms" className="hover:text-zinc-900 transition-colors">Términos de Servicio</Link></li>
              <li><Link href="/privacy" className="hover:text-zinc-900 transition-colors">Política de Privacidad</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-400 text-sm">
            © 2026 Aura. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
import Link from 'next/link';
