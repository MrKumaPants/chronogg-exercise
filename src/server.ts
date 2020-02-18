import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'

import { permissions } from './permissions'
import { schema } from './schema'
import { createContext } from './context'

new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: createContext,
}).listen({ port: 4000 }, () => console.log(`🚀 Server ready at: http://localhost:4000`))
