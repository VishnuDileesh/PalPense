import { SafeAreaView, View } from 'react-native'
import React from 'react'

import TotalCard from '../../../components/TotalCard';
import OrderLog from '../../../components/OrderLog';
import OrderInput from '../../../components/OrderInput';
import Header from '../../../components/Header';
import usePenseStore from '../../../store/penseStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import type { Pense } from '../../../store/penseStore';

const SessionScreen = () => {

  const { setCurrentPenseId, setCurrentPense } = usePenseStore();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setCurrentPenseId('');
        setCurrentPense({} as Pense);
      };
    }, [])
  );

  return (
    <SafeAreaView className='h-full bg-white'>
      
      <Header />

      <TotalCard initialStoreName={'Tea Mania'} />

      <OrderLog />
      
      <OrderInput />
    
    </SafeAreaView>
  )
}

export default SessionScreen