const {ApolloServer} = require('apollo-server');
const {typeDefs} = require("./schema/typeDefs");
const {resolvers} = require("./schema/resolvers");
const {connectDb} = require("./config/db");

const server = new ApolloServer({
  typeDefs,
  resolvers
})

async function startServer() {
  await connectDb();
  server.listen().then(({url}) => {
    console.log(`server is running at ${url}`);
  })
}

startServer();