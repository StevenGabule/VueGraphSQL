const {ApolloServer, gql} = require('apollo-server');

const Todos = [
    {task: 'Wash a card', completed: false},
    {task: 'Clean room', completed: false},
    {task: 'Coding in php', completed: true},
];

const typeDefs = gql`

    type Todos {
        task: String
        completed: Boolean
    }

    type Query {
        getTodos: [Todos]
    }

    type Mutation {
        addTodo(task: String, completed: Boolean) : Todos
    }
`;

const resolvers = {
    Query: {
        getTodos: () => Todos
    },
    Mutation: {
        addTodo: (_, {task, completed}) => {
            const todo = {task,completed};
            Todos.push(todo);
            return todo;
        }
    }
};

const server = new ApolloServer({
    typeDefs, resolvers
});

server.listen().then(({url}) => {
    console.log(`Server listening! ${url}`);
});
