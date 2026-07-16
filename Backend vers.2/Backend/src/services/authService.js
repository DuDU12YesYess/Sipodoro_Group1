const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userRepository");

// register()
const register = async (userData) => {
  const { username, email, password } = userData;

  if (!username || !email || !password) {
    const error = new Error("Required fields missing");
    error.status = 400;
    throw error;
  }

  const existingUsername = await userRepository.findByUsername(username);
  if (existingUsername) {
    const error = new Error("This username already exists!");
    error.status = 409;
    throw error;
  }

  const existingEmail = await userRepository.findByEmail(email);
  if (existingEmail) {
    const error = new Error("This email already exists!");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Assign role: 'admin' for specific email, otherwise 'user'
  const role = email === "admin@sipodoro.com" ? "admin" : "user";

  const newUser = await userRepository.createUser({
    username,
    email,
    password: hashedPassword,
    role: role
  });

  const userId = newUser.id;

  try {
    await userRepository.createWallet(userId);
    await userRepository.createGarden(userId);
    await userRepository.createStreak(userId);
  } catch (err) {
    console.error("Setup error:", err.message);
  }

  return {
    message: "Registered successfully!",
    user: { user_id: userId, username, email, role }
  };
};

// login()
const login = async (emailOrUsername, password) => {
  // 1. Find user by email or username
  const user = await userRepository.findByEmailOrUsername(emailOrUsername);
  
  if (!user) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  // 2. Compare password (Ensure column name matches your DB: 'password' or 'password_hash')
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  // 3. Generate JWT
  const token = jwt.sign(
    { user_id: user.id, role: user.role },
    process.env.JWT_SECRET || "FIXED_SECRET_KEY_FOR_TESTING",
    { expiresIn: "1d" }
  );

  return {
    message: "Login successful!",
    token,
    user: {
      user_id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  };
};

module.exports = { register, login };