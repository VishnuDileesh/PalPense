import { getDB } from '@/db';
import { items, orders, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'expo-crypto';
import { create } from 'zustand'
import usePenseStore from './penseStore';

interface Order {
    id: number;
    qty: number;
    item: string;
    itemPrice: number;
    person: string;
  }
  
interface OrderStore {
    orders: Order[];
    fetchOrders: (currentPenseId: string) => void;
    addOrder: (order: Order, currentPenseId: string, storeId: string) => void;
}

const useOrderStore = create<OrderStore>((set) => ({
    orders: [],
    fetchOrders: async (currentPenseId: string) => {

        try {
            const db = getDB();
            const result = await db.select({
                orders: orders,
                items: items,
                users: users
            })
        .from(orders).where(eq(orders.penseId, currentPenseId))
        .leftJoin(items, eq(orders.itemId, items.id))
        .leftJoin(users, eq(orders.userId, users.id));
        
        const transformedOrders = result.map(row => ({
            id: parseInt(row.orders.id),
            qty: row.orders.quantity,
            item: row.items?.itemName || '',
            itemPrice: row.items?.itemPrice || null,
            person: row.users?.userName || ''
        }));

        console.log('transformedOrders', transformedOrders)
            
            set({ orders: transformedOrders as Order[] });
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    },  
    addOrder: async (order, currentPenseId, storeId) => {

        const { fetchPenseTotalAmount } = usePenseStore.getState();
       

        try {
            const db = getDB();

            console.log('order', order)
            console.log('currentPenseId', currentPenseId)

            // insert item to items table, if not exists
            let item = await db.select().from(items).where(eq(items.itemName, order.item));

            console.log('item check if exists', item)

            if (item.length === 0) {
                console.log('item does not exist, inserting item')

                const insertedItems = await db.insert(items).values({
                    id: randomUUID(),
                    itemName: order.item,   
                    itemPrice: 0,
                    storeId: storeId,
                    createdAt: new Date()
                }).returning();

                if (insertedItems.length > 0) {
                    item = [insertedItems[0]];

                    console.log('item inserted', item)
                } else {
                    throw new Error('Failed to insert item');
                }
            } else {
                console.log('item already exists')
            }

            

            // insert user to users table, if not exists
            let user = await db.select().from(users).where(eq(users.userName, order.person));

            if (user.length === 0) {        
                console.log('user does not exist, inserting user')

                const insertedUsers = await db.insert(users).values({
                    id: randomUUID(),
                    userName: order.person,
                    createdAt: new Date()
                }).returning();

                if (insertedUsers.length > 0) {
                    user = [insertedUsers[0]];

                    console.log('user inserted', user)
                } else {
                    throw new Error('Failed to insert user');
                }
            }

            await db.insert(orders).values({
                id: order.id.toString(),
                quantity: order.qty,
                itemId: item[0].id,
                userId: user[0].id,
                penseId: currentPenseId
            });

            console.log('order inserted')

            set((state) => ({
                    orders: [...state.orders, order]
                }));


            fetchPenseTotalAmount(currentPenseId);
        } catch (error) {
            console.error('Error adding order:', error);
        }
    },
}))

export default useOrderStore;