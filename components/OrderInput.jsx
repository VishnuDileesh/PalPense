import { View, Text, TextInput } from 'react-native'
import React from 'react'

const OrderInput = () => {
  return (
    <View className='bg-white rounded-2xl p-4 shadow-md mx-6 mt-2 mb-2 px-4'>
        <TextInput className='rounded-2xl p-2 mx-6 mt-4 px-2' placeholder='2 puffs for selva' />
    </View>

  )
}

export default OrderInput