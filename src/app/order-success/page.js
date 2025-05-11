'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Gunakan import dinamis untuk ReactConfetti agar hanya di-render di client
const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [localOrderId, setLocalOrderId] = useState('');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (orderId) {
      setLocalOrderId(orderId);
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [orderId]);

  return (
    <div className="container mx-auto py-8 px-8 text-gray-900 relative">
      <h1 className="text-2xl font-bold mb-4">Pesanan Berhasil!</h1>
      {localOrderId && (
        <p className="mb-4">
          Terima kasih atas pesanan Anda dengan ID: <strong>{localOrderId}</strong>.
        </p>
      )}
      <p className="mb-4">
        Pesanan Anda sedang diproses dan akan segera dikirimkan.
      </p>
      <p>
        <Link href="/" className="text-blue-500 hover:underline">
          Kembali ke Halaman Utama
        </Link>
      </p>

      {/* Konfeti */}
      <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        gravity={0.1}
        numberOfPieces={300}
        confettiColors={['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722']} // Warna-warni
      />
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<p>Memuat...</p>}>
      <OrderSuccessContent />
    </Suspense>
  );
}