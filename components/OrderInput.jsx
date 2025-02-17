import { View, TextInput, TouchableOpacity, Text, Keyboard } from "react-native"
import React, { useState } from 'react'

import useOrderStore from "../store/orderStore"

const OrderInput = () => {

    const { addOrder } = useOrderStore()

    const [input, setInput] = useState("");


    const handleAddOrder = () => {
        const match = input.match(/(\d+)\s+(.+)\s+for\s+(.+)/i);
        if (match) {
          const [, qty, item, person] = match;
          addOrder({ id: Date.now(), qty: Number(qty), item, person });
          setInput("");
        }

        Keyboard.dismiss();
      };
    


  return (
    <View className='bg-white rounded-2xl p-4 shadow-md mx-6 mt-2 mb-2 px-4'>
        <TextInput className='rounded-2xl p-2 mx-6 mt-4 px-2' onChangeText={setInput}  value={input} placeholder='2 puffs for selva' />
        <TouchableOpacity className="bg-blue-500 p-3 rounded-md mt-2" onPress={handleAddOrder}>
        <Text className="text-white text-center">Add Order</Text>
      </TouchableOpacity>
    </View>

  )
}

export default OrderInput