/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as Context from '../context'
import * as client from '@prisma/client'

declare global {
    interface NexusGenCustomOutputProperties<TypeName extends string> {
        crud: NexusPrisma<TypeName, 'crud'>
        model: NexusPrisma<TypeName, 'model'>
    }
}

declare global {
    type NexusGen = NexusGenTypes
}

export interface NexusGenInputs {
    BrandWhereUniqueInput: {
        // input type
        id?: number | null // Int
        name?: string | null // String
    }
    PostWhereUniqueInput: {
        // input type
        id?: number | null // Int
    }
    UserWhereUniqueInput: {
        // input type
        email?: string | null // String
        id?: number | null // Int
    }
}

export interface NexusGenEnums {}

export interface NexusGenRootTypes {
    Authorization: {
        // root type
        token: string // String!
        user: NexusGenRootTypes['User'] // User!
    }
    Brand: client.Brand
    Mutation: {}
    Post: client.Post
    Query: {}
    User: client.User
    String: string
    Int: number
    Float: number
    Boolean: boolean
    ID: string
    DateTime: any
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
    BrandWhereUniqueInput: NexusGenInputs['BrandWhereUniqueInput']
    PostWhereUniqueInput: NexusGenInputs['PostWhereUniqueInput']
    UserWhereUniqueInput: NexusGenInputs['UserWhereUniqueInput']
}

export interface NexusGenFieldTypes {
    Authorization: {
        // field return type
        token: string // String!
        user: NexusGenRootTypes['User'] // User!
    }
    Brand: {
        // field return type
        createdAt: any // DateTime!
        id: number // Int!
        name: string | null // String
        users: NexusGenRootTypes['User'][] // [User!]!
    }
    Mutation: {
        // field return type
        addUserToBrand: NexusGenRootTypes['Brand'] // Brand!
        createBrand: NexusGenRootTypes['Brand'] // Brand!
        createPost: NexusGenRootTypes['Post'] // Post!
        createUser: NexusGenRootTypes['User'] // User!
        deleteBrand: NexusGenRootTypes['Brand'] | null // Brand
        deletePost: NexusGenRootTypes['Post'] | null // Post
        login: NexusGenRootTypes['Authorization'] // Authorization!
        removeUserFromBrand: NexusGenRootTypes['Brand'] // Brand!
        updateBrand: NexusGenRootTypes['Brand'] // Brand!
        updatePost: NexusGenRootTypes['Post'] // Post!
        updateUser: NexusGenRootTypes['Authorization'] // Authorization!
    }
    Post: {
        // field return type
        author: NexusGenRootTypes['User'] // User!
        brand: NexusGenRootTypes['Brand'] // Brand!
        content: string | null // String
        createdAt: any // DateTime!
        id: number // Int!
        title: string // String!
    }
    Query: {
        // field return type
        brand: NexusGenRootTypes['Brand'] | null // Brand
        brandPosts: NexusGenRootTypes['Post'][] // [Post!]!
        brands: NexusGenRootTypes['Brand'][] // [Brand!]!
        me: NexusGenRootTypes['User'] | null // User
        post: NexusGenRootTypes['Post'] | null // Post
        posts: NexusGenRootTypes['Post'][] // [Post!]!
        user: NexusGenRootTypes['User'] | null // User
        users: NexusGenRootTypes['User'][] // [User!]!
    }
    User: {
        // field return type
        active: boolean // Boolean!
        brands: NexusGenRootTypes['Brand'][] // [Brand!]!
        createdAt: any // DateTime!
        email: string // String!
        id: number // Int!
        name: string | null // String
    }
}

export interface NexusGenArgTypes {
    Mutation: {
        addUserToBrand: {
            // args
            brandId?: string | null // ID
            userId?: string | null // ID
        }
        createBrand: {
            // args
            name: string // String!
        }
        createPost: {
            // args
            brandId?: string | null // ID
            content?: string | null // String
            title: string // String!
        }
        createUser: {
            // args
            email: string // String!
            name?: string | null // String
            password: string // String!
        }
        deleteBrand: {
            // args
            id?: string | null // ID
        }
        deletePost: {
            // args
            id?: string | null // ID
        }
        login: {
            // args
            email: string // String!
            password: string // String!
        }
        removeUserFromBrand: {
            // args
            brandId?: string | null // ID
            userId?: string | null // ID
        }
        updateBrand: {
            // args
            id?: string | null // ID
            name: string // String!
        }
        updatePost: {
            // args
            content?: string | null // String
            id?: string | null // ID
            title: string // String!
        }
        updateUser: {
            // args
            email: string // String!
            id?: string | null // ID
            name?: string | null // String
            password: string // String!
        }
    }
    Query: {
        brand: {
            // args
            where: NexusGenInputs['BrandWhereUniqueInput'] // BrandWhereUniqueInput!
        }
        brandPosts: {
            // args
            id: string // ID!
        }
        brands: {
            // args
            after?: number | null // Int
            before?: number | null // Int
            first?: number | null // Int
            last?: number | null // Int
            skip?: number | null // Int
        }
        post: {
            // args
            where: NexusGenInputs['PostWhereUniqueInput'] // PostWhereUniqueInput!
        }
        posts: {
            // args
            after?: number | null // Int
            before?: number | null // Int
            first?: number | null // Int
            last?: number | null // Int
            skip?: number | null // Int
        }
        user: {
            // args
            where: NexusGenInputs['UserWhereUniqueInput'] // UserWhereUniqueInput!
        }
        users: {
            // args
            after?: number | null // Int
            before?: number | null // Int
            first?: number | null // Int
            last?: number | null // Int
            skip?: number | null // Int
        }
    }
}

export interface NexusGenAbstractResolveReturnTypes {}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = 'Authorization' | 'Brand' | 'Mutation' | 'Post' | 'Query' | 'User'

export type NexusGenInputNames = 'BrandWhereUniqueInput' | 'PostWhereUniqueInput' | 'UserWhereUniqueInput'

export type NexusGenEnumNames = never

export type NexusGenInterfaceNames = never

export type NexusGenScalarNames = 'Boolean' | 'DateTime' | 'Float' | 'ID' | 'Int' | 'String'

export type NexusGenUnionNames = never

export interface NexusGenTypes {
    context: Context.Context
    inputTypes: NexusGenInputs
    rootTypes: NexusGenRootTypes
    argTypes: NexusGenArgTypes
    fieldTypes: NexusGenFieldTypes
    allTypes: NexusGenAllTypes
    inheritedFields: NexusGenInheritedFields
    objectNames: NexusGenObjectNames
    inputNames: NexusGenInputNames
    enumNames: NexusGenEnumNames
    interfaceNames: NexusGenInterfaceNames
    scalarNames: NexusGenScalarNames
    unionNames: NexusGenUnionNames
    allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames']
    allOutputTypes:
        | NexusGenTypes['objectNames']
        | NexusGenTypes['enumNames']
        | NexusGenTypes['unionNames']
        | NexusGenTypes['interfaceNames']
        | NexusGenTypes['scalarNames']
    allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
    abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames']
    abstractResolveReturn: NexusGenAbstractResolveReturnTypes
}

declare global {
    interface NexusGenPluginTypeConfig<TypeName extends string> {}
    interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {}
    interface NexusGenPluginSchemaConfig {}
}
