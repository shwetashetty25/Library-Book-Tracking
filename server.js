const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

async function startServer() {
  const app = express();

  await mongoose.connect("mongodb://127.0.0.1:27017/library");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("Server running at http://localhost:4000/graphql")
  );
}

startServer();