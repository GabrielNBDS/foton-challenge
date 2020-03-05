const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

function genereteToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const user = await User.findOne({ username });

      if (!user) {
        throw new UserInputError("User not found");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UserInputError("Wrong credentials");
      }

      const token = genereteToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async register(_, { registerInput: { username, email, password } }) {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Email already taken");
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = genereteToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    }
  }
};
