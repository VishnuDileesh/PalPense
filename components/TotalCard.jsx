import { View, Text, TextInput } from 'react-native'
import React, { useState} from 'react'

const TotalCard = ({total, initialStoreName}) => {

    const [storeName, setStoreName] = useState(initialStoreName || 'Tea Mania');

  return (
    <View className="bg-[#E16B5A] rounded-2xl p-4 shadow-md mx-6 mt-4 px-6">
        <Text className="text-lg font-bold text-[#1E293B] font-inter-medium">Total</Text>
        <Text className="mt-2 text-5xl font-bold text-[#1E293B] font-inter-medium">{total}</Text>
        <TextInput 
            className="text-2xl font-bold text-[#1E293B] font-inter-medium"
            value={storeName}
            onChangeText={setStoreName}
            placeholder={storeName || initialStoreName}
            placeholderTextColor="#1E293B"
        />
            
        {/* <Text className="text-lg text-[#1E293B]">{storeName}</Text> */}
      </View>
  )
}

export default TotalCard