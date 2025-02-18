import { SafeAreaView, TouchableOpacity, Text } from "react-native";

import Header from "../../../components/Header";
import TotalCard from "../../../components/TotalCard";
import OrderLog from "../../../components/OrderLog";
import { router } from "expo-router";
export default function Index() {

  const addPense = () => {
    router.push('/session-screen')
  }

  return (
    <SafeAreaView className='h-full bg-white'>
      
      <Header />

      <TotalCard total="₹2450" initialStoreName="Jan" />

      <OrderLog />

      <TouchableOpacity onPress={addPense} className="bg-primary p-4 rounded-xl mx-6 my-4">
        <Text className="text-white text-center text-lg font-semibold">Add Pense</Text>
      </TouchableOpacity>
    


    </SafeAreaView>
  );
}
