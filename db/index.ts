import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { DB_NAME } from "@/config/constants";

// Create a single database instance
const expoDB = openDatabaseSync(DB_NAME);
const db = drizzle(expoDB);

export const getDB = () => db; 