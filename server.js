const {ApolloServer, gql} = require('apollo-server');

const Todo = [
    {task: 'Wash a card', completed: false},
    {task: 'Clean room', completed: false},
    {task: 'Coding in php', completed: true},
];

const typeDefs = gql`

    type Todo {
        task: String
        completed: Boolean
    }
    
    type Query {
        getTodo: [Todo]
    }

`;

const resolvers = {
    Query: {
        getTodo:  () => Todo
    }
};

const server = new ApolloServer({
    typeDefs, resolvers
});

server.listen().then(({url}) => {
    console.log(`Server listening! ${url}`);
});
