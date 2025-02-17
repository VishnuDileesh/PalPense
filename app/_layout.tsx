import { Stack } from "expo-router";
import { useFonts } from "expo-font";

import "./global.css"


export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
  });
  
  return <Stack />;
}
