import { View, Text, Image, SafeAreaView } from 'react-native'
import React from 'react'

import Logo from "../../../assets/images/palpense-logo.png";
import TotalCard from '../../../components/TotalCard';
const SessionScreen = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <View className='mx-6 mt-4'>
        <Image className="w-48 h-12" resizeMode="contain" source={Logo} />
      </View>

      <TotalCard total={255} storeName="Tea Mania" />

    
    </SafeAreaView>
  )
}

export default SessionScreen