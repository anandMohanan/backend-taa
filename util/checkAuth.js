const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT);
        return user;
      } catch (e) {
        throw new AuthenticationError("Invalid or Expired token");
      }
    }
    throw new Error("Authentication token must be 'Barer [token]");
  }
  throw new Error("Authentication header must be provided");
};
