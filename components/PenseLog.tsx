import { View, Text, FlatList } from 'react-native'
import React from 'react'

import usePenseStore from '../store/penseStore'


const PenseLog = () => {

    const { penses } = usePenseStore()

  return (
    penses.length === 0 ? (
        <View className='bg-white rounded-2xl p-4 shadow-md mx-6 mt-4 px-2 flex-1 justify-center items-center'>
            <View className="bg-white p-3 rounded-xl my-1 mx-3 shadow-md self-center justify-center">
                <Text className="text-lg text-primary">
                    No orders yet. Add one!
                </Text>
            </View>
        </View>
    ) : (
        <FlatList
        className='bg-white rounded-2xl p-4 shadow-md mx-6 mt-4 px-2'
            data={penses}
            keyExtractor={(pense) => pense.id.toString()}
            renderItem={({ item }) => (
            <View className="bg-white p-3 rounded-xl my-1 mx-3 shadow-md self-end">
                <Text className="text-lg text-primary">
                {item.id} | {item.totalAmount} 
                </Text>
            </View>
            )}
                />
        )
  )
}

export default PenseLog