import { View, Text } from 'react-native'
import React from 'react'

const TotalCard = ({total, storeName}) => {
  return (
    <View className="bg-[#E16B5A] rounded-2xl p-4 shadow-md mx-6 mt-4">
        <Text className="text-lg font-medium text-[#1E293B]">Total</Text>
        <Text className="text-3xl font-bold text-[#1E293B]">{total}</Text>
        <Text className="text-lg text-[#1E293B]">{storeName}</Text>
      </View>
  )
}

export default TotalCard