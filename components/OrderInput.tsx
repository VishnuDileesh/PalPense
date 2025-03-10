import { View, TextInput, TouchableOpacity, Keyboard } from "react-native"
import React, { useState } from 'react'

import { FontAwesome } from '@expo/vector-icons';

import useOrderStore from "../store/orderStore"
import usePenseStore from "../store/penseStore"
const OrderInput = () => {

    const { addOrder } = useOrderStore()
    const { currentPenseId, storeId } = usePenseStore();

    console.log('currentPenseId', currentPenseId)


    const [input, setInput] = useState("");

    const handleAddOrder = () => {
        if (!input.trim()) return; 

        const match = input.match(/(\d+)\s+(.+)\s+for\s+(.+)/i);

        if (match) {
          const [, qty, item, person] = match;

          if (!currentPenseId) {
            console.log("No current pense id");
            return;
          }

          addOrder({ id: Date.now(), qty: Number(qty), item, person }, currentPenseId, storeId || '');
      
          setInput(""); 
          Keyboard.dismiss(); 
        }
      };
      

  return (
    <View className='flex-row justify-between bg-white rounded-2xl p-4 shadow-md mx-6 mt-2 mb-2 px-4'>
        <TextInput className='rounded-2xl p-2 mx-6 mt-4 px-2' onChangeText={setInput}  value={input} placeholder='2 puffs for selva' />
        <TouchableOpacity
        className=" p-3 rounded-md mt-2 items-center"
        onPress={handleAddOrder}
      >
        <FontAwesome name="send" size={24} color="text-primary" />
      </TouchableOpacity>
    </View>
  )
}

export default OrderInput