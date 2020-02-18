import { compare, hash } from "bcryptjs";
import { idArg, queryType } from "nexus";

import { getUserId } from "../utils";
import { Brand } from "./Brand";

export const Query = queryType({
  definition(t) {
    t.crud.user();
    t.crud.users();

    t.field("me", {
      type: "User",
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.user.findOne({
          where: {
            id: Number(userId)
          }
        });
      }
    });

    t.crud.brand();
    t.crud.brands();

    t.crud.post();
    t.crud.posts();

    t.list.field("brandPosts", {
      type: "Post",
      args: {
        id: idArg({ nullable: false })
      },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.post.findMany({
          where: {
            brand: { id: Number(id) }
          }
        });
      }
    });
  }
});
