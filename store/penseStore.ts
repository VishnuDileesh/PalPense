import { create } from "zustand"
import { penses } from "@/db/schema"
import { getDB } from "@/db";
import { randomUUID } from "expo-crypto";

type Pense = {
    id: string;
    createdBy: string | null;
    storeId: string | null;
    totalAmount: number;
    paidBy: string | null;
    createdAt: Date | null;
}

type PenseStore = {
    penses: Pense[];
    fetchPenses: () => Promise<void>;
    addPense: (newPense: Omit<Pense, 'id' | 'createdAt'>) => Promise<string>;
}

const usePenseStore = create<PenseStore>((set) => ({
    penses: [],

    fetchPenses: async () => {
        const db = getDB();
        const result = await db.select().from(penses);
        set({ penses: result as Pense[] });
    },

    addPense: async (newPense) => {
        const db = getDB();
        const penseToInsert = {
            ...newPense,
            id: randomUUID(),
            createdAt: new Date()
        };
        
        const insertedPense = await db.insert(penses).values(penseToInsert).returning();
        set((state) => ({ penses: [...state.penses, insertedPense[0]] }));
        return insertedPense[0].id;
    },
}))

export default usePenseStore;
