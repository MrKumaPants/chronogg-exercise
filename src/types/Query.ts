import { compare, hash } from 'bcryptjs'
import { queryType } from 'nexus'

import { getUserId } from '../utils'

export const Query = queryType({
    definition(t) {
        t.crud.user()
        t.crud.users()

        t.field('me', {
            type: 'User',
            nullable: true,
            resolve: (parent, args, ctx) => {
                const userId = getUserId(ctx)
                return ctx.prisma.user.findOne({
                    where: {
                        id: Number(userId),
                    },
                })
            },
        })

        t.crud.brand()
        t.crud.brands()

        t.crud.post()
        t.crud.posts()
    },
})
