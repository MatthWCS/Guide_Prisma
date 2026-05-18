import { Request, Response, NextFunction } from "express"
import { ZodSchema, ZodError } from "zod"

// validate(schema) retourne un middleware Express prêt à l'emploi
export function validate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                error: "Données invalides",
                details: result.error.flatten().fieldErrors,
                // Exemple de réponse :
                // { error: "Données invalides",
                //   details: { email: ["Email invalide"], password: ["Min 8 caractères"] } }
            })
        }

        // On remplace req.body par les données nettoyées par Zod :
        // - .trim() appliqué, valeurs par défaut injectées, types coercés
        req.body = result.data
        next()
    }
}