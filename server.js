const jwt = require("jsonwebtoken");

const {ApolloServer, AuthenticationError} = require("apollo-server");

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// import typeDefs and resolvers
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

// import environment variables and mongoose models
require("dotenv").config({path: "variables.env"});
const User = require("./models/User");
const Post = require("./models/Post");

// connect to mlab database
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DB connected"))
    .catch(errors => console.error(errors));

// verify jwt token passed from client
const getUser = async token => {
    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (e) {
            throw new AuthenticationError('Your session has ended. Please sign in again.');
        }
    }
};

// create Apollo/GraphQL server using typedefs, resolvers and context object
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: error => ({
        name: error.name,
        message: error.message.replace('Context creation failed:', '')
    }),
    context: async ({req}) => {
        const token = req.headers['authorization'];
        return {User, Post, currentUser: await getUser(token)};
    }
});

server.listen().then(({url}) => {
    console.log(`Server listening on ${url}`);
});
