# Getting Started

## Running

```shell
npm install
npm run dev
```

## Playground

GraphQL Playground is a GraphQL IDE featuring interactive schema documentation, automatic schema reloading, support for GraphQL subscriptions, query history, and configuring HTTP headers

After running the GraphQL Server, open the browser link http://localhost:4000

## Studio

Prisma Studio is a database IDE with GraphQL relations integrations

```shell
npm run prisma
```

Then open the browser link http://localhost:5555

# API

## Queries

## Mutations

# Libraries

## [apollo-server](https://www.npmjs.com/package/apollo-server)

Apollo Server is a community-maintained open-source GraphQL server.

## [graphql-middleware](https://www.npmjs.com/package/graphql-middleware)

GraphQL Middleware is a schema wrapper which allows you to manage additional functionality across multiple resolvers efficiently.

## [graphql-shield](https://www.npmjs.com/package/graphql-shield)

GraphQL Shield helps you create a permission layer for your application. Using an intuitive rule-API, you'll gain the power of the shield engine on every request and reduce the load time of every request with smart caching. This way you can make sure your application will remain quick, and no internal data will be exposed.

## [nexus](https://www.npmjs.com/package/nexus)

Declarative, code-first and strongly typed GraphQL schema construction for TypeScript & JavaScript

## [prisma2](https://www.npmjs.com/package/prisma2)

Prisma is a standalone component which is deployed in front of your SQL database and generates a GraphQL API.

# Considerations

## Scaling

This application does not keep any data around in memory. This is also typical of a GraphQL server as it's only an API/logic layer. This allows us to scale out horizontally with tools such as AWS load balancer. The real bottleneck would eventually become the database; however, most databases have ways to do this but that's out of this scope.

## Improvements

### Error Messages

The graphql-shield library currently swallows error messages. This is by design from a security standpoint. However, graphql-shield allows you to create and pass through error messages.

### Logging

Right now there is no logging. However, several libraries exist for custom logging such as apollo-logger, graphql-log, graphql-logger that can be hooked in as middleware to ApolloServer.
