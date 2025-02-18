import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

import "./global.css"
import { ActivityIndicator, View, Text } from "react-native";
import { useEffect, Suspense } from "react";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";

export const DB_NAME = "pense.db";

export default function RootLayout() {

  const expoDB = openDatabaseSync(DB_NAME);

  const db = drizzle(expoDB);

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
