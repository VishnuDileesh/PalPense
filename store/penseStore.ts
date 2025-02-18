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
    addPense: (newPense: Omit<Pense, 'id' | 'createdAt'>) => Promise<string | null>;
    currentPenseId: string | null;
    setCurrentPenseId: (id: string) => void;
}

const usePenseStore = create<PenseStore>((set) => ({
    penses: [],
    currentPenseId: null,

    fetchPenses: async () => {
        try {
            const db = getDB();
            const result = await db.select().from(penses);
            set({ penses: result as Pense[] });
        } catch (error) {
            console.error('Error fetching penses:', error);
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
                set((state) => ({ penses: [...state.penses, insertedPense[0]], currentPenseId: insertedPense[0].id }));
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
    }
}))

export default usePenseStore;
