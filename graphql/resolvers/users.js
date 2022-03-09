const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const User = require("../../models/User");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("errors", { errors });
      }
      const user = await User.findOne({ username });
      const mail = await User.findOne({ email });
      if (user) {
        throw new UserInputError("username is taken", {
          errors: {
            username: "username is taken",
          },
        });
      }
      if (mail) {
        throw new UserInputError("This mail id is already in use", {
          errors: {
            username: "mail id already in use",
          },
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found! (Sign up)", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "wrong credentials";
        throw new UserInputError("wrong credentials ", { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
  },
};
