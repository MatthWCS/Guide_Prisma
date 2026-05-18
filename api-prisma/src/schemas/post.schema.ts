import { z } from "zod"

export const createPostSchema = z.object({
    title: z.string().min(1, "Titre requis").max(255),
    slug: z.string()
        .min(1)
        .max(255)
        .regex(/^[a-z0-9-]+$/, "Slug invalide (minuscules, chiffres, tirets)"),
    content: z.string().optional(),
    authorId: z.number("authorId doit être un nombre").int().positive(),
    tagIds: z.array(z.number().int().positive()).optional().default([]),
})

export const updatePostSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
    tagIds: z.array(z.number().int().positive()).optional(),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>