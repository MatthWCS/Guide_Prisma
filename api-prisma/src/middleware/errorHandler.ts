import { Request, Response, NextFunction } from "express"
import { Prisma } from "../../generated/prisma/client.js"

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    console.error(err)

    // Erreur Prisma connue (contrainte, not found, FK…)
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":   // contrainte unique violée
                return res.status(409).json({
                    error: "Conflit : valeur déjà utilisée",
                    field: (err.meta?.target as string[])?.join(", "),
                    code: err.code,
                })
            case "P2025":   // enregistrement introuvable (update/delete)
                return res.status(404).json({ error: "Ressource introuvable", code: err.code })
            case "P2003":   // violation de clé étrangère
                return res.status(400).json({ error: "Référence invalide", code: err.code })
            default:
                return res.status(400).json({ error: err.message, code: err.code })
        }
    }

    // Erreur de validation (mauvais type de données)
    if (err instanceof Prisma.PrismaClientValidationError) {
        return res.status(400).json({ error: "Données invalides" })
    }

    // Erreur générique
    res.status(500).json({
        error: "Erreur interne du serveur",
        ...(process.env.NODE_ENV === "development" && { details: err.message }),
    })
}