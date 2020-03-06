const {ApolloServer, gql} = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});
const User = require('./models/User');
const Post = require('./models/Post');

mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB CONNECTED!'))
    .catch(err => console.error(err));

const typeDefs = gql`

    type Todos {
        task: String
        completed: Boolean
    }

    type Query {
        getTodos: [Todos]
    }

`;

const server = new ApolloServer({
    typeDefs,
    context: {
        User,
        Post
    }
});

server.listen().then(({url}) => {
    console.log(`Server listening! ${url}`);
});
