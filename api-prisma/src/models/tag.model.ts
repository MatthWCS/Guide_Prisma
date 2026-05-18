import { prisma } from "../lib/prisma.js"

export const TagModel = {

    findAll: () =>
        prisma.tag.findMany({
            orderBy: { name: "asc" },
            include: { _count: { select: { posts: true } } },  // nb de posts par tag
        }),

    findById: (id: number) =>
        prisma.tag.findUnique({
            where: { id },
            include: { posts: { select: { id: true, title: true, published: true } } },
        }),

    findByName: (name: string) =>
        prisma.tag.findUnique({ where: { name } }),

    create: (name: string) =>
        prisma.tag.create({ data: { name } }),

    update: (id: number, name: string) =>
        prisma.tag.update({ where: { id }, data: { name } }),

    remove: (id: number) =>
        prisma.tag.delete({ where: { id } }),

    upsert: (name: string) =>
        prisma.tag.upsert({
            where: { name },
            create: { name },
            update: {},           // rien à mettre à jour si déjà existant
        }),

}