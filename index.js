const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

require("dotenv").config();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
  }),
});

mongoose.connect(process.env.MONGO).then((e) => {
  console.log(`Mongodb connected`);
  return server.listen({ port: 5000 }).then((res) => {
    console.log(`server running at ${res.url}`);
  });
});
