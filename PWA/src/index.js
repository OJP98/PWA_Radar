const {
    ApolloServer
} = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('../models')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        models
    }
})

server
    .listen()
    .then(() => console.log('Server running on 127.0.0.1:4000'))