import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { mutationType, stringArg, idArg } from 'nexus'

import { APP_SECRET, getUserId } from '../utils'

export const Mutation = mutationType({
    definition(t) {
        t.field('login', {
            type: 'Authorization',
            args: {
                email: stringArg({ nullable: false }),
                password: stringArg({ nullable: false }),
            },
            resolve: async (parent, { email, password }, context) => {
                const user = await context.prisma.user.findOne({
                    where: {
                        email,
                    },
                })
                if (!user) {
                    throw new Error(`No user found for email: ${email}`)
                }
                const passwordValid = await compare(password, user.password)
                if (!passwordValid) {
                    throw new Error('Invalid password')
                }
                return {
                    token: sign({ userId: user.id }, APP_SECRET),
                    user,
                }
            },
        })

        t.field('createUser', {
            type: 'User',
            args: {
                name: stringArg(),
                email: stringArg({ nullable: false }),
                password: stringArg({ nullable: false }),
            },
            resolve: async (parent, { name, email, password }, context) => {
                const hashedPassword = await hash(password, 10)
                return context.prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                    },
                })
            },
        })

        t.field('updateUser', {
            type: 'Authorization',
            args: {
                id: idArg(),
                name: stringArg(),
                email: stringArg({ nullable: false }),
                password: stringArg({ nullable: false }),
            },
            resolve: async (parent, { id, name, email, password }, context) => {
                const hashedPassword = await hash(password, 10)
                return context.prisma.user.update({
                    where: { id },
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                    },
                })
            },
        })

        t.field('createBrand', {
            type: 'Brand',
            args: {
                name: stringArg({ nullable: false }),
            },
            resolve: async (parent, { name }, context) => {
                const userId = getUserId(context)
                return context.prisma.brand.create({
                    data: {
                        name,
                        users: { connect: { id: Number(userId) } },
                    },
                })
            },
        })

        t.field('deleteBrand', {
            type: 'Brand',
            nullable: true,
            args: { id: idArg() },
            resolve: (parent, { id }, context) => {
                return context.prisma.brand.delete({
                    where: {
                        id: Number(id),
                    },
                })
            },
        })

        t.field('updateBrand', {
            type: 'Brand',
            args: {
                id: idArg(),
                name: stringArg({ nullable: false }),
            },
            resolve: async (parent, { id, name }, context) => {
                return context.prisma.brand.update({
                    where: { id },
                    data: {
                        name,
                    },
                })
            },
        })

        t.field('addUserToBrand', {
            type: 'Brand',
            nullable: false,
            args: {
                userId: idArg(),
                brandId: idArg(),
            },
            resolve: async (parent, { userId, brandId }, context) => {
                return context.prisma.brand.update({
                    where: { id: Number(brandId) },
                    data: {
                        users: { connect: { id: Number(userId) } },
                    },
                })
            },
        })

        t.field('removeUserFromBrand', {
            type: 'Brand',
            nullable: false,
            args: {
                userId: idArg(),
                brandId: idArg(),
            },
            resolve: async (parent, { userId, brandId }, context) => {
                return context.prisma.brand.update({
                    where: { id: Number(brandId) },
                    data: {
                        users: { disconnect: { id: Number(brandId) } },
                    },
                })
            },
        })

        t.field('createPost', {
            type: 'Post',
            args: {
                brandId: idArg(),
                title: stringArg({ nullable: false }),
                content: stringArg(),
            },
            resolve: async (parent, { brandId, title, content }, context) => {
                const userId = getUserId(context)
                return context.prisma.post.create({
                    data: {
                        title,
                        content,
                        author: { connect: { id: Number(userId) } },
                        brand: { connect: { id: Number(brandId) } },
                    },
                })
            },
        })

        t.field('deletePost', {
            type: 'Post',
            nullable: true,
            args: { id: idArg() },
            resolve: async (parent, { id }, context) => {
                return context.prisma.post.delete({
                    where: {
                        id: Number(id),
                    },
                })
            },
        })

        t.field('updatePost', {
            type: 'Post',
            args: {
                id: idArg(),
                title: stringArg({ nullable: false }),
                content: stringArg(),
            },
            resolve: async (parent, { id, title, content }, context) => {
                const userId = getUserId(context)
                return context.prisma.post.update({
                    where: { id },
                    data: {
                        title,
                        content,
                    },
                })
            },
        })
    },
})
