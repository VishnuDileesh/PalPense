import { View, Image } from 'react-native'
import React from 'react'
import Logo from '../assets/images/palpense-logo.png'

const Header = () => {
  return (
    <View className='mx-6 mt-4'>
        <Image className="w-48 h-12" resizeMode="contain" source={Logo} />
      </View>
  )
}

export default Header