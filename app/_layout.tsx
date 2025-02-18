import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

import "./global.css"
import { ActivityIndicator, View, Text } from "react-native";
import { useEffect, Suspense } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { getDB } from "@/db";
import { DB_NAME } from "@/config/constants";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";


export default function RootLayout() {
  const db = getDB();

  useDrizzleStudio(db);

  const { success, error } = useMigrations(db, migrations);


  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
  });

  useEffect(() => {
    SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "red" }}>Database migration failed!</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }


  if (!fontsLoaded || !success) {
    return <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>;
  }
  
  return (
    <Suspense fallback={<View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>}>
      <SQLiteProvider 
        databaseName={DB_NAME} 
        options={{ enableChangeListener: true }} 
        useSuspense>
        <Stack screenOptions={{ headerShown: false }} />
      </SQLiteProvider>
    </Suspense>
  )
  
}
