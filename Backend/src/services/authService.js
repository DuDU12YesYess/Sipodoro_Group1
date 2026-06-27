const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/userRepository");

class AuthService {
  //Register a new user
  async register(userData) {
    try {
      const { username, email, password } = userData;

      if (!username || !email || !password) {
        throw new Error("Username, email, and password are required");
      }

      const existingUser = await userRepository.findByEmail(email);

      if (existingUser) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userRepository.createUser({
        username,
        email,
        password: hashedPassword,
      });

      const result = user.toObject ? user.toObject() : user;

      delete result.password;

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //login user
  async login(email, password) {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const user = await userRepository.findByEmail(email);

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
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
      throw new Error(error.message);
    }
  }

  // get profile
  async getProfile(userId) {
    try {
      const user = await userRepository.getUserById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const result = user.toObject();

      delete result.password;

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // update profile
  async updateProfile(userId, data) {
    try {
      delete data.password;

      const updatedUser = await userRepository.updateUser(
        userId,
        data
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      const result = updatedUser.toObject();

      delete result.password;

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // change password
  async changePassword(
    userId,
    oldPassword,
    newPassword
  ) {
    try {
      const user = await userRepository.getUserById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const validPassword = await bcrypt.compare(
        oldPassword,
        user.password
      );

      if (!validPassword) {
        throw new Error("Old password is incorrect");
      }

      const hashedPassword = await bcrypt.hash(
        newPassword,
        10
      );

      await userRepository.updateUser(userId, {
        password: hashedPassword,
      });

      return {
        success: true,
        message: "Password changed successfully",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new AuthService();
