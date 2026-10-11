import { Search, Menu, LogOut, User, Package } from 'lucide-react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { logoutAction } from '@/actions/auth';
import { Suspense } from 'react';
import CartIcon from '@/components/cart/CartIcon';

async function AuthActions() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has('token');

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/orders" className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors" title="Mis Compras">
          <Package className="w-5 h-5" />
        </Link>
        <form action={logoutAction}>
          <button type="submit" className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors" title="Cerrar Sesión">
            <LogOut className="w-5 h-5" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <Link href="/auth/login" className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors" title="Iniciar Sesión">
      <User className="w-5 h-5" />
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md border-zinc-200/50 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform duration-300">
                A
              </div>
              <span className="font-outfit font-semibold text-xl tracking-tight">Aura</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-zinc-600">
            <Link href="/" className="hover:text-zinc-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-zinc-900 after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300">Catálogo</Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            
            <Suspense fallback={<div className="w-9 h-9 rounded-full bg-zinc-100 animate-pulse" />}>
              <AuthActions />
            </Suspense>

            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
