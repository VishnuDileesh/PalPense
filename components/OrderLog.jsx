import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'

const orders = [
    {
        id: 1,
        qty: 2,
        item: 'Burger',
        person: 'Selva',
    },
    {
        id: 2,
        qty: 1,
        item: 'Coke',
        person: 'Jibin',
    },
    {
        id: 3,
        qty: 1,
        item: 'Coke',
        person: 'Selva',
    },
    {
        id: 4,
        qty: 1,
        item: 'Coffee',
        person: 'Riyas',
    },
    {
        id: 5,
        qty: 2,
        item: 'Puffs',
        person: 'Riyas',
    },
    {
        id: 6,
        qty: 3,
        item: 'Samosa',
        person: 'Rohit',
    },
    {
        id: 7,
        qty: 1,
        item: 'Lemon Tea',
        person: 'Hari',
    },
    {
        id: 8,
        qty: 2,
        item: 'Egg Baji',
        person: 'Riyas',
    },
]

const OrderLog = () => {
  return (
    <ScrollView className='bg-white rounded-2xl p-4 shadow-md mx-6 mt-4 px-2'>
        
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View className="bg-white p-3 rounded-xl my-1 mx-3 shadow-md self-end">
                <Text className="text-lg text-[#1E293B]">
                {item.qty} {item.item} for {item.person}
                </Text>
            </View>
            )}
        />

    </ScrollView>
  )
}

export default OrderLog