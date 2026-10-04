import "dotenv/config"; // ⬅️ Ye sabse pehla import hona chahiye, har cheez se upar

import app from "./app.js";
import connectDB from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});