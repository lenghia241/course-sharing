const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

require("dotenv").config({ path: "./variables.env" });

const Course = require("./models/Course");
const User = require("./models/User");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));

//Set up jwt middleware
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.log(err);
    }
  }
  next();
});

// Add in Graphql middleware
const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");

//Create Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Creat graphiql application
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

//Connect Schema with Graphql
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Course,
      User,
      currentUser
    }
  }))
);

//Connect to Mlab db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
