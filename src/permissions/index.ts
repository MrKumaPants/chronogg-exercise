import { allow, and, rule, shield } from 'graphql-shield'
import { find } from 'lodash'
import { getUserId } from '../utils'

const rules = {
    isActiveUser: rule()(async (parent, args, context) => {
        const userId = getUserId(context)
        const user = await context.prisma.user.findOne({
            where: {
                id: Number(userId),
            },
        })

        return user.active
    }),
    isAuthenticatedUser: rule()(async (parent, args, context) => {
        const userId = getUserId(context)
        return Boolean(userId)
    }),
    isBrandUser: rule()(async (parent, { brandId }, context) => {
        const userId = getUserId(context)
        const user = await context.prisma.user.findOne({
            where: {
                id: Number(userId),
            },
            include: { brands: true },
        })

        return !!find(user.brands, { id: Number(brandId) })
    }),
}

export const permissions = shield({
           Query: {
               brand: allow,
               brands: allow,
               me: rules.isAuthenticatedUser,
               post: allow,
               posts: allow,
               user: allow,
               users: allow,
           },
           Mutation: {
               activateUser: and(rules.isAuthenticatedUser, rules.isActiveUser),
               addUserToBrand: and(rules.isAuthenticatedUser, rules.isActiveUser, rules.isBrandUser),
               createBrand: and(rules.isAuthenticatedUser, rules.isActiveUser),
               createPost: and(rules.isAuthenticatedUser, rules.isActiveUser, rules.isBrandUser),
               createUser: allow,
               deactivateUser: and(rules.isAuthenticatedUser, rules.isActiveUser),
               deleteBrand: and(rules.isAuthenticatedUser, rules.isActiveUser, rules.isBrandUser),
               deletePost: and(rules.isAuthenticatedUser, rules.isActiveUser, rules.isBrandUser),
               login: allow,
               removeUserFromBrand: and(rules.isAuthenticatedUser, rules.isActiveUser, rules.isBrandUser),
               updateBrand: and(rules.isAuthenticatedUser, rules.isActiveUser, rules.isBrandUser),
               updatePost: and(rules.isAuthenticatedUser, rules.isActiveUser, rules.isBrandUser),
               updateUser: and(rules.isAuthenticatedUser, rules.isActiveUser),
           },
           Brand: allow,
           Post: allow,
           User: allow,
       })
