// src/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SessionType = "afternoon" | "night" | string;

export interface CartItem {
  id: string;
  date: string;
  session: SessionType;
  type: "PC" | "PS5";
  count: number;
  price: number;
  time?: string; // only for PS5 hourly mode
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => ({
          items: [...state.items.filter((i) => i.id !== item.id), item],
        })),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // saved in localStorage
    }
  )
);
