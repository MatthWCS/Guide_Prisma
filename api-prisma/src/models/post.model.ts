import { prisma } from "../lib/prisma.js"

type PostCreateInput = {
    title: string
    content?: string
    slug: string
    authorId: number
    tagIds?: number[]
}

type PostUpdateInput = {
    title?: string
    content?: string
    published?: boolean
    tagIds?: number[]
}

const postInclude = {
    author: { select: { id: true, name: true, email: true } },
    tags: { select: { id: true, name: true } },
} as const

export const PostModel = {

    findAll: (page: number, limit: number, published?: boolean) => {
        const skip = (page - 1) * limit
        const where = published !== undefined ? { published } : {}
        return prisma.$transaction([
            prisma.post.findMany({
                where, skip, take: limit,
                include: postInclude,
                orderBy: { id: "desc" },
            }),
            prisma.post.count({ where }),
        ])
    },

    findById: (id: number) =>
        prisma.post.findUnique({ where: { id }, include: postInclude }),

    findBySlug: (slug: string) =>
        prisma.post.findUnique({ where: { slug }, include: postInclude }),

    create: ({ tagIds, ...data }: PostCreateInput) =>
        prisma.post.create({
            data: {
                ...data,
                tags: tagIds?.length
                    ? { connect: tagIds.map((id) => ({ id })) }
                    : undefined,
            },
            include: postInclude,
        }),

    update: (id: number, { tagIds, ...data }: PostUpdateInput) =>
        prisma.post.update({
            where: { id },
            data: {
                ...data,
                tags: tagIds !== undefined
                    ? { set: tagIds.map((id) => ({ id })) }  // set remplace les tags existants
                    : undefined,
            },
            include: postInclude,
        }),

    remove: (id: number) =>
        prisma.post.delete({ where: { id } }),

    countByAuthor: (authorId: number) =>
        prisma.post.count({ where: { authorId } }),

}