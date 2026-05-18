import { z } from "zod"

// Schéma de création — tous les champs requis sauf name
export const createUserSchema = z.object({
    email: z.string().email("Email invalide"),
    name: z.string().min(2, "Min 2 caractères").max(100).optional(),
    password: z.string().min(8, "Min 8 caractères"),
})

// Schéma de modification — tous les champs optionnels (PATCH)
export const updateUserSchema = z.object({
    name: z.string().min(2).max(100).optional(),
})

// Types inférés automatiquement depuis les schémas
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>

// Exemple de ce que TypeScript infère :
// CreateUserInput = { email: string; name?: string; password: string }
// UpdateUserInput = { name?: string }