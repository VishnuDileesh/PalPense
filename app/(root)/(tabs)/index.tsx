import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import Header from "../../../components/Header";
import TotalCard from "../../../components/TotalCard";
import { router } from "expo-router";
import usePenseStore from "@/store/penseStore";
import { useEffect } from "react";
import PenseLog from "@/components/PenseLog";

export default function Index() {
  const { penses, fetchPenses, addPense: createPense } = usePenseStore();

  useEffect(() => {
    fetchPenses();
  }, []);

  console.log('Penses:', penses);

  const addPense = async () => {
    const newPense = {
      totalAmount: 0,
      storeId: null,
      paidBy: null,
      createdBy: null
    };
    
    await createPense(newPense);
    router.push('/session-screen');
  }

  // Calculate total from all penses
  const total = penses.reduce((sum, pense) => sum + pense.totalAmount, 0);

  return (
    <SafeAreaView className='h-full bg-white'>
      <Header />
      <TotalCard total={`₹${total.toFixed(2)}`} initialStoreName="Jan" />
      <PenseLog />

      <TouchableOpacity onPress={addPense} className="bg-primary p-4 rounded-xl mx-6 my-4">
        <Text className="text-white text-center text-lg font-semibold">Add Pense</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
