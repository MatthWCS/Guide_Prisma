import { Request, Response, NextFunction } from "express"
import { UserModel } from "../models/user.model.js"
import { type CreateUserInput, type UpdateUserInput } from "../schemas/user.schema.js"

// Type helper pour typer req.params proprement avec NodeNext
type IdParam = { id: string }

export const UserController = {

    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Math.max(1, Number(req.query.page) || 1)
            const limit = Math.min(100, Number(req.query.limit) || 10)
            const [data, total] = await UserModel.findAll(page, limit)
            res.json({ data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } })
        } catch (err) { next(err) }
    },

    getOne: async (req: Request<IdParam>, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ error: "ID invalide" })
            const user = await UserModel.findById(id)
            if (!user) return res.status(404).json({ error: "Utilisateur introuvable" })
            res.json(user)
        } catch (err) { next(err) }
    },

    // req.body est déjà validé et typé CreateUserInput par le middleware validate
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body as CreateUserInput
            // Note : hasher data.password avec bcrypt avant de passer au model
            const user = await UserModel.create(data)
            res.status(201).json(user)
        } catch (err) { next(err) }
    },

    // req.body est déjà validé et typé UpdateUserInput par le middleware validate
    update: async (req: Request<IdParam>, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ error: "ID invalide" })
            const user = await UserModel.update(id, req.body as UpdateUserInput)
            res.json(user)
        } catch (err) { next(err) }
    },

    remove: async (req: Request<IdParam>, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ error: "ID invalide" })
            await UserModel.remove(id)
            res.status(204).send()
        } catch (err) { next(err) }
    },

}