import { z } from "zod"

export const createTagSchema = z.object({
    name: z.string()
        .min(1, "Nom requis")
        .max(50, "Max 50 caractères")
        .trim(),               // supprime les espaces avant/après
})

export const updateTagSchema = z.object({
    name: z.string().min(1).max(50).trim(),
})

export type CreateTagInput = z.infer<typeof createTagSchema>
export type UpdateTagInput = z.infer<typeof updateTagSchema>