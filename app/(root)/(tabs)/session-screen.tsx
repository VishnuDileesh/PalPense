import { SafeAreaView, View } from 'react-native'
import React from 'react'

import TotalCard from '../../../components/TotalCard';
import OrderLog from '../../../components/OrderLog';
import OrderInput from '../../../components/OrderInput';
import Header from '../../../components/Header';

const SessionScreen = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      
      <Header />

      <TotalCard total="₹245" initialStoreName="Tea Mania" />

      <OrderLog />
      
      <OrderInput />
    
    </SafeAreaView>
  )
}

export default SessionScreen