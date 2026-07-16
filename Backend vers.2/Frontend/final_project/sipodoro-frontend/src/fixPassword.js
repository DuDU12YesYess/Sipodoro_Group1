// src/fixPassword.js
import bcrypt from "bcrypt";
import { User } from "./models/index.js"; // Adjust the path if your index.js is elsewhere

async function resetPassword() {
  try {
    console.log("🚀 Starting password reset for chi@gmail.com...");

    // 1. Generate hash
    const newHash = await bcrypt.hash("cake123", 10);

    // 2. Update via Sequelize model
    const [updatedRows] = await User.update(
      { password_hash: newHash },
      { where: { email: "chi@gmail.com" } }
    );

    if (updatedRows > 0) {
      console.log("✅ Success: Password for 'chi@gmail.com' has been reset to 'cake123'.");
    } else {
      console.log("❌ User not found. Verify the email in your database.");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    window.close();
  }
}

resetPassword();