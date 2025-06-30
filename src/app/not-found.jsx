'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signIn');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-xl font-semibold">Página não encontrada. Redirecionando para o login...</h1>
    </div>
  );
}