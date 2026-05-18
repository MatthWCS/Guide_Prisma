import { prisma } from "../lib/prisma.js"

// Champs publics : on exclut password de tous les select
const userSelect = {
    id: true,
    email: true,
    name: true,
    createdAt: true,
} as const

export const UserModel = {

    findAll: (page: number, limit: number) => {
        const skip = (page - 1) * limit
        return prisma.$transaction([
            prisma.user.findMany({
                skip, take: limit,
                select: userSelect,
                orderBy: { id: "desc" },
            }),
            prisma.user.count(),
        ])
    },

    findById: (id: number) =>
        prisma.user.findUnique({
            where: { id },
            select: { ...userSelect, posts: { select: { id: true, title: true, published: true } } },
        }),

    findByEmail: (email: string) =>
        prisma.user.findUnique({ where: { email } }),

    create: (data: { email: string; name?: string; password: string }) =>
        prisma.user.create({ data, select: userSelect }),

    update: (id: number, data: { name?: string }) =>
        prisma.user.update({ where: { id }, data, select: userSelect }),

    remove: (id: number) =>
        prisma.user.delete({ where: { id } }),

}