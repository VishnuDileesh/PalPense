import { create } from 'zustand'

interface Order {
    id: number;
    qty: number;
    item: string;
    person: string;
  }
  
interface OrderStore {
    orders: Order[];
    addOrder: (order: Order) => void;
}

const useOrderStore = create<OrderStore>((set) => ({
    orders: [],
    addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
}))

export default useOrderStore;