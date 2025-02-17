import { Text, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "../../../assets/images/palpense-logo.png";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView className="h-full bg-white">
      <Link href="/session-screen">Order Log</Link>
    </SafeAreaView>
  );
}
