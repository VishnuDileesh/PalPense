import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

import "./global.css"
import { View, Text } from "react-native";
import { useEffect } from "react";


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
  });

 

  useEffect(() => {
    SplashScreen.hideAsync();
  }, [fontsLoaded]);


  if (!fontsLoaded) return null;
  
  return <Stack screenOptions={{ headerShown: false }} />;
}
