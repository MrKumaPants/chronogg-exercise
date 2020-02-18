# Description

This application is a simple example utilizing several different libraries in order to demonstrate how easy it is to implement typically more complex behaviors in a GraphQL server. Going off the new Chrono product, this application implements `user`, `brand`, and `post` objects. It features encrypted authentication along with a security layer via `graphql-shield`. This security layer allows us to easily gate API calls behind conditions such as: a logged in `user` can only make a new post to a `brand` if they are part of that `brand`.

It also features the `prisma2` library which acts as a sort of ORM for GraphQL allowing us to use PostgresQL, MySQL, and SQLite. The `Nexus` library is also used which gives us a code-first approach to creating a GraphQL schema.

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

## Examples

There are two user accounts `kuma@example.com` and `piper@example.com`. Both accounts have the password `graphql`. The `piper@example.com` account is non-active.

Login as non-active user

```graphql
mutation {
    login(email: "piper@example.com", password: "graphql") {
        token
    }
}
```

Getting information as logged in user

```graphql
query {
    me {
        id
        createdAt
        name
        email
        active
        brands {
            id
            name
        }
    }
}
```

Getting brand 1 and all associated posts

```graphql
query {
    brand(where: { id: 1 }) {
        id
        createdAt
        name
        posts {
            title
            content
        }
    }
}
```

Making a post to brand 2 as a non-active user should fail

```graphql
mutation {
    createPost(brandId: 2, title: "Ball", content: "Is life") {
        title
        content
    }
}
```

Making a post to brand 1 as a non-active user should fail

```graphql
mutation {
    createPost(brandId: 1, title: "Ball", content: "Is life") {
        title
        content
    }
}
```

Login as active user

```graphql
mutation {
    login(email: "kuma@example.com", password: "graphql") {
        token
    }
}
```

Making a post to brand 1 as an active user should pass

```graphql
mutation {
    createPost(brandId: 1, title: "Treats", content: "Feed them to me") {
        title
        content
    }
}
```

Getting brand 1 and all associated posts

```graphql
query {
    brand(where: { id: 1 }) {
        id
        createdAt
        name
        posts {
            title
            content
        }
    }
}
```

# Authentication

This application uses `bcrypt` in order to create encrypted authentication tokens. Login via the `login` API call to retrieve the authorization token. All other API calls require this token by passing the given token via the `Authorization` HTTP header with `Bearer <token>`.

# Security Layer

## isActiveUser

The user must be active in order to access the API call.

## isAuthenticatedUser

The user must be logged in in order to access the API call.

## isBrandUser

A user can only call mutation API functions if they are part of that brand. This relationship exists between the `User` and `Brand` tables via the `BrandUsers` mapping table.

# API

This is only a list of the functions and their security requirements. For a more complete API listing, you can browse via the Playground page.

## Queries

-   brand
    -   Description: Gets a single brand object
    -   Security: allow
-   brands
    -   Description: Gets multiple brand objects
    -   Security: allow
-   me
    -   Description: Gets the currently logged in user object
    -   Security: isAuthenticatedUser
-   post
    -   Description: Gets a single post object
    -   Security: allow
-   posts
    -   Description: Gets multiple post objects
    -   Security: allow
-   user
    -   Description: Gets a single user object
    -   Security: allow
-   users
    -   Description: Getse multiple user objects
    -   Security: allow

## Mutations

-   activateUser
    -   Description: Activates a user
    -   Security: isAuthenticatedUser and isActiveUser
-   addUserToBrand
    -   Description: Add a user to a brand
    -   Security: isAuthenticatedUser and isActiveUser and isBrandUser
-   createBrand
    -   Description: Create a new brand
    -   Security: isAuthenticatedUser and isActiveUser
-   createPost
    -   Description: Create a new post under a specified brand
    -   Security: isAuthenticatedUser and isActiveUser and isBrandUser
-   createUser
    -   Description: Create a new user
    -   Security: allow
-   deactivateUser
    -   Description: Deactivates a user
    -   Security: isAuthenticatedUser and isActiveUser
-   deleteBrand
    -   Description: Delete a specific brand
    -   Security: isAuthenticatedUser and isActiveUser and isBrandUser
-   deletePost
    -   Description: Delete a specific post
    -   Security: isAuthenticatedUser and isActiveUser and isBrandUser
-   login
    -   Description: Obtain an authorization token
    -   Security: allow
-   removeUserFromBrand
    -   Description: Remove a user from a specified brand
    -   Security: isAuthenticatedUser and isActiveUser and isBrandUser
-   updateBrand
    -   Description: Update a brand object
    -   Security: isAuthenticatedUser and isActiveUser and isBrandUser
-   updatePost
    -   Description: Update a post object
    -   Security: isAuthenticatedUser and isActiveUser and isBrandUser
-   updateUser
    -   Description: Update a user object
    -   Security: isAuthenticatedUser and isActiveUser

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

The `graphql-shield` library currently swallows error messages. This is by design for security purposes. However, `graphql-shield` allows you to create and pass through error messages.

### Logging

Right now there is no logging. However, several libraries exist for custom logging such as `apollo-logger`, `graphql-log`, `graphql-logger` that can be hooked in as middleware to `ApolloServer`.

### Account Types

There are no account types, so anyone logged in can perform most of the actions. This can easily be fixed by adding an `enum` of account types and applying that to the `User` table. We can then restrict calls by say `Admin` or `Basic` user types.
