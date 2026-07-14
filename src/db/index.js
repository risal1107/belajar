import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("Warning: DATABASE_URL environment variable is not set. Database connection might fail.");
}

const poolConnection = databaseUrl ? mysql.createPool(databaseUrl) : null;
export const db = poolConnection ? drizzle(poolConnection, { schema, mode: "default" }) : null;
