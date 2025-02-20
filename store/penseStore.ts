import { create } from "zustand"
import { items, orders, penses } from "@/db/schema"
import { getDB } from "@/db";
import { randomUUID } from "expo-crypto";
import { eq, sql } from "drizzle-orm";

export type Pense = {
    id: string;
    createdBy: string | null;
    storeId: string | null;
    totalAmount: number;
    paidBy: string | null;
    createdAt: Date | null;
}

type PenseStore = {
    penses: Pense[];
    currentPense: Pense | null;
    setCurrentPense: (pense: Pense) => void;
    fetchPenses: () => Promise<void>;
    fetchPenseTotalAmount: (id: string) => Promise<number>;
    addPense: (newPense: Omit<Pense, 'id' | 'createdAt'>) => Promise<string | null>;
    currentPenseId: string | null;
    setCurrentPenseId: (id: string) => void;
    storeId: string | null;
    setStoreId: (id: string) => void;
}

const usePenseStore = create<PenseStore>((set) => ({
    penses: [],
    currentPenseId: null,
    currentPense: null,
    setCurrentPense: (pense: Pense) => {
        set({ currentPense: { ...pense } });
    },
    fetchPenses: async () => {
        try {
            const db = getDB();
            const result = await db.select().from(penses);
            set({ penses: result as Pense[] });
        } catch (error) {
            console.error('Error fetching penses:', error);
        }
    },

    fetchPenseTotalAmount: async (id: string) => {
        try {
            const db = getDB();

            const result = await db.select({
                totalAmount: sql<number>`SUM(items.itemPrice * orders.quantity)`
            })
            .from(orders)
            .innerJoin(items, eq(orders.itemId, items.id))
            .where(eq(orders.penseId, id));

            set((state) => ({ 
                currentPense: { 
                    ...state.currentPense, 
                    totalAmount: result[0]?.totalAmount ?? 0 
                } as Pense
            }));

            return result[0]?.totalAmount ?? 0;
        } catch (error) {
            console.error('Error fetching pense total amount:', error);
            throw error;
        }
    },

    addPense: async (newPense) => {
        try {
            const db = getDB();
            const penseToInsert = {
                ...newPense,
            id: randomUUID(),
            createdAt: new Date()
            };
        
            const insertedPense = await db.insert(penses).values(penseToInsert).returning();

            if (insertedPense.length > 0) {
                set((state) => ({ penses: [...state.penses, insertedPense[0]], currentPenseId: insertedPense[0].id, currentPense: insertedPense[0] }));
                return insertedPense[0].id;
            }

        } catch (error) {
            console.error('Error adding pense:', error);
            throw error;
        }

        return null;
    },

    setCurrentPenseId: (id: string) => {
        set({ currentPenseId: id });
    },

    storeId: null,

    setStoreId: (id: string) => {
        set({ storeId: id });
    }
}))

export default usePenseStore;
