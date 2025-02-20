import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState} from 'react'
import usePenseStore from './../store/penseStore';
import { getDB } from '@/db';
import { stores, penses, orders, items } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { randomUUID } from 'expo-crypto';

const TotalCard = ({initialStoreName}: {initialStoreName: string} ) => {

  const { currentPenseId, currentPense, fetchPenseTotalAmount, setStoreId, storeId } = usePenseStore();

    const [storeName, setStoreName] = useState(initialStoreName || 'Tea Mania');


    useEffect(() => {

      if (!storeId) {
        setStoreName(initialStoreName);
      }


      fetchPenseTotalAmount(currentPenseId || '');


      const fetchStoreName = async () => {
        if (!currentPenseId) return;
        const db = getDB();
        const penseData = await db.select().from(penses).where(eq(penses.id, currentPenseId)).limit(1);
        
        const storeId = penseData[0]?.storeId;

        if (storeId) {
          const storeData = await db.select().from(stores).where(eq(stores.id, storeId)).limit(1);
          setStoreName(storeData[0]?.storeName);
          setStoreId(storeId);
        } else {
          setStoreName(initialStoreName);
          setStoreId('');
        }
      }
      fetchStoreName();


      const fetchOrderTotal = async () => {
        if (!currentPenseId) return;
        const db = getDB();

        console.log('inside fetchOrderTotal')
        
        const result = await db.select({
          totalAmount: sql<number>`SUM(items.itemPrice)`
        })
        .from(orders)
        .innerJoin(items, eq(orders.itemId, items.id))
        .where(eq(orders.penseId, currentPenseId));

      }
      fetchOrderTotal();
    }, [currentPenseId]);

    const handleStoreNameUpdate = async () => {
      if (!storeName.trim() || !currentPenseId) return;

      const db = getDB();

      const existingStore = await db.select().from(stores).where(eq(stores.storeName, storeName)).limit(1);

      let storeId = existingStore.length > 0 ? existingStore[0].id : null;

      if (!storeId) {
        const newStore = {
            id: randomUUID(),
            storeName: storeName,
            createdAt: new Date()
        };

        const insertedStore = await db.insert(stores).values(newStore).returning();
        storeId = insertedStore[0].id;

        await db.update(penses).set({ storeId }).where(eq(penses.id, currentPenseId));
      }

      if (existingStore.length > 0) {
        console.log('Store already exists');
      } else {
        console.log('Store does not exist');
      }

    }

  return (
    <View className="bg-[#E16B5A] rounded-2xl p-4 shadow-md mx-6 mt-4 px-6">
        <Text className="text-lg font-bold text-[#1E293B] font-inter-medium">Total</Text>
        <Text className="mt-2 text-5xl font-bold text-[#1E293B] font-inter-medium">{`₹${currentPense?.totalAmount}`}</Text>
        <TextInput 
            className="text-2xl font-bold text-[#1E293B] font-inter-medium"
            value={storeName}
            onChangeText={setStoreName}
            onBlur={handleStoreNameUpdate}
            placeholder={storeName || initialStoreName}
            placeholderTextColor="#1E293B"
        />
      </View>
  )
}

export default TotalCard