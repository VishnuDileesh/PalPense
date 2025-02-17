import { Text, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "../assets/images/palpense-logo.png";

export default function Index() {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-black">Tea Mania</Text>
      </View>
      <Image source={Logo}  />
    </SafeAreaView>
  );
}
