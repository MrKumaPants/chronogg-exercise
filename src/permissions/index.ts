import { allow, and, rule, shield } from "graphql-shield";
import { find } from "lodash";
import { getUserId } from "../utils";

const rules = {
  isAuthenticatedUser: rule()(async (parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isBrandUser: rule()(async (parent, { brandId }, context) => {
    const userId = getUserId(context);
    const brands = await context.prisma.user.findOne({
      where: {
        id: Number(userId)
      },
      include: { brands: true }
    });

    return !!find(brands.brands, { id: 1 });
  })
};

export const permissions = shield({
  Query: {
    brand: allow,
    brandPosts: allow,
    brands: allow,
    me: rules.isAuthenticatedUser,
    post: allow,
    posts: allow,
    user: allow,
    users: allow
  },
  Mutation: {
    addUserToBrand: and(rules.isAuthenticatedUser, rules.isBrandUser),
    createBrand: rules.isAuthenticatedUser,
    createPost: and(rules.isAuthenticatedUser, rules.isBrandUser),
    createUser: allow,
    deleteBrand: and(rules.isAuthenticatedUser, rules.isBrandUser),
    deletePost: and(rules.isAuthenticatedUser, rules.isBrandUser),
    login: allow,
    removeUserFromBrand: and(rules.isAuthenticatedUser, rules.isBrandUser),
    updateBrand: and(rules.isAuthenticatedUser, rules.isBrandUser),
    updatePost: and(rules.isAuthenticatedUser, rules.isBrandUser),
    updateUser: rules.isAuthenticatedUser
  },
  Brand: allow,
  Post: allow,
  User: allow
});
