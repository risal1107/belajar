import { Elysia } from "elysia";
import { db } from "./db/index.js";
import { users } from "./db/schema.js";

const app = new Elysia()
  .get("/", () => "Hello World")
  .get("/users", async () => {
    if (!db) {
      return { error: "Database not configured. Set DATABASE_URL in .env file." };
    }
    try {
      return await db.select().from(users);
    } catch (error) {
      return { error: error.message };
    }
  })
  .post("/users", async ({ body }) => {
    if (!db) {
      return { error: "Database not configured. Set DATABASE_URL in .env file." };
    }
    try {
      const { name, email } = body;
      if (!name || !email) {
        return { error: "Name and Email are required fields." };
      }
      await db.insert(users).values({ name, email });
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  })
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
