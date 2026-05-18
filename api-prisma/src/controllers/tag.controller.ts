import { Request, Response, NextFunction } from "express"
import { TagModel } from "../models/tag.model.js"
import { type CreateTagInput, type UpdateTagInput } from "../schemas/tag.schema.js"

type IdParam = { id: string }

export const TagController = {

    getAll: async (_req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await TagModel.findAll())
        } catch (err) { next(err) }
    },

    getOne: async (req: Request<IdParam>, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ error: "ID invalide" })
            const tag = await TagModel.findById(id)
            if (!tag) return res.status(404).json({ error: "Tag introuvable" })
            res.json(tag)
        } catch (err) { next(err) }
    },

    // req.body déjà validé et typé CreateTagInput par le middleware validate
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body as CreateTagInput
            res.status(201).json(await TagModel.create(name))
        } catch (err) { next(err) }
    },

    // req.body déjà validé et typé UpdateTagInput par le middleware validate
    update: async (req: Request<IdParam>, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ error: "ID invalide" })
            const { name } = req.body as UpdateTagInput
            res.json(await TagModel.update(id, name))
        } catch (err) { next(err) }
    },

    remove: async (req: Request<IdParam>, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ error: "ID invalide" })
            await TagModel.remove(id)
            res.status(204).send()
        } catch (err) { next(err) }
    },

}