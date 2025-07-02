import { create } from "zustand";

type SessionType = "afternoon" | "night";

export interface CartItem {
  id: string;
  date: string;
  session: SessionType;
  type: "PC" | "PS5";
  count: number;
  price: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
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
}));
