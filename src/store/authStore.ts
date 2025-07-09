// ✅ src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id?: string;
  name?: string;
  phone: string;
  role?: "CUSTOMER" | "ADMIN";
  balance?: number;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  hasHydrated: boolean;
  login: (phone: string, name?: string, id?: string, balance?: number, role?: "CUSTOMER" | "ADMIN") => void;
  logout: () => void;
  register: (phone: string, name?: string, id?: string, role?: "CUSTOMER" | "ADMIN") => void;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      hasHydrated: false,

      login: (phone, name = "", id = "", balance = 0, role = "CUSTOMER") => {
        const user = { phone, name, id, balance, role };
        set({ user, isLoggedIn: true });
      },

      register: (phone, name = "", id = "", role = "CUSTOMER") => {
        const user = { phone, name, id, role };
        set({ user, isLoggedIn: true });
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },

      setHasHydrated: (hydrated: boolean) => set({ hasHydrated: hydrated }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
