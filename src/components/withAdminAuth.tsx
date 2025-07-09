'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { ComponentType } from 'react';

export default function withAdminAuth<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  const ProtectedAdminRoute = (props: P) => {
    const { user, isLoggedIn, hasHydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (!hasHydrated) return;

      const isAdmin = user?.role === 'ADMIN';

      if (!isLoggedIn || !isAdmin) {
        toast.warning('شما اجازه دسترسی به این صفحه را ندارید.');
        router.replace('/');
      }
    }, [hasHydrated, isLoggedIn, user, router]);

    if (!hasHydrated || !isLoggedIn || user?.role !== 'ADMIN') return null;

    return <WrappedComponent {...props} />;
  };

  return ProtectedAdminRoute;
}
