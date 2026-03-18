import { create } from 'zustand';

// Calculate total derived from items
const calculateTotal = (items) => {
  return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
};

export const useCartStore = create((set, get) => ({
  items: [],
  total: 0,

  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    let newItems;

    if (existingItem) {
      newItems = state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...state.items, { ...product, quantity: 1 }];
    }

    return {
      items: newItems,
      total: calculateTotal(newItems)
    };
  }),

  removeItem: (productId) => set((state) => {
    const existingItem = state.items.find(item => item.id === productId);
    let newItems;

    if (existingItem && existingItem.quantity > 1) {
      newItems = state.items.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    } else {
      newItems = state.items.filter(item => item.id !== productId);
    }

    return {
      items: newItems,
      total: calculateTotal(newItems)
    };
  }),

  clearCart: () => set({
    items: [],
    total: 0
  }),

  getTotal: () => get().total
}));
