import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { env } from "./src/config/env.js";

try {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`API listening on http://localhost:${env.PORT}`);
  });
} catch (err) {
  console.error("Failed to start server", err);
  process.exit(1);
}
