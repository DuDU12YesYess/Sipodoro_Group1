const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

class AuthService {
  /**
   * Register new user
   */
  async register(userData) {
    try {
      const existingUser = await userRepository.findByEmail(
        userData.email
      );

      if (existingUser) {
        throw new Error("Email already registered");
      }

      const hashedPassword = await bcrypt.hash(
        userData.password,
        10
      );

      const user = await userRepository.createUser({
        ...userData,
        password: hashedPassword,
      });

      const userObject = user.toObject
        ? user.toObject()
        : user;

      delete userObject.password;

      return userObject;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(email, password) {
    try {
      const user =
        await userRepository.findByEmail(email);

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const match = await bcrypt.compare(
        password,
        user.password
      );

      if (!match) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      const userObject = user.toObject();

      delete userObject.password;

      return {
        token,
        user: userObject,
      };
    } catch (error) {
      throw error;
    }
  }

  async getProfile(userId) {
    const user =
      await userRepository.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
  }

  async updateProfile(userId, data) {
    const updated =
      await userRepository.updateUser(
        userId,
        data
      );

    if (!updated) {
      throw new Error("User not found");
    }

    return updated;
  }

  async changePassword(
    userId,
    oldPassword,
    newPassword
  ) {
    const user =
      await userRepository.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const valid = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!valid) {
      throw new Error("Incorrect password");
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    await userRepository.updateUser(userId, {
      password: hashedPassword,
    });

    return {
      message: "Password updated successfully",
    };
  }
}

module.exports = new AuthService();
