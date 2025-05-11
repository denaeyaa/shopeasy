import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CartIndicator from '@/components/CartIndicator';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; 

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 overflow-hidden">
      <button
        className="lg:hidden fixed top-4 left-4 bg-gray-300 p-2 rounded-md z-20"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      <div
        className={`bg-gray-200 w-64 flex-shrink-0 p-4 transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-10 lg:static`}
      >
        <div className='pt-20'>
        <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/admin/orders" className="block p-2 rounded hover:bg-gray-300">
              Pesanan
            </Link>
          </li>
          <li>
            <Link href="/admin/products" className="block p-2 rounded hover:bg-gray-300">
              Produk
            </Link>
          </li>
        </ul>
      </div>
        </div>
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 relative overflow-y-auto"> 
        {children}
        {!isAdminRoute && (
          <div className="fixed top-4 right-4 z-10">
            <CartIndicator />
          </div>
        )}
      </div>
    </div>
  );
}