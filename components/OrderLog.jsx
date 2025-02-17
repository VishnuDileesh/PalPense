import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'

import useOrderStore from '../store/orderStore'


const OrderLog = () => {

    const { orders } = useOrderStore()
  return (
    <ScrollView className='bg-white rounded-2xl p-4 shadow-md mx-6 mt-4 px-2'>
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View className="bg-white p-3 rounded-xl my-1 mx-3 shadow-md self-end">
                <Text className="text-lg text-primary">
                {item.qty} {item.item.toLowerCase()} for {item.person.toLowerCase()}
                </Text>
            </View>
            )}
        />
    </ScrollView>
  )
}

export default OrderLog