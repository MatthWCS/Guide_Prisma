import { Request, Response, NextFunction } from "express"
import { PostModel } from "../models/post.model.js"
import { type CreatePostInput, type UpdatePostInput } from "../schemas/post.schema.js"

type IdParam = { id: string }

export const PostController = {

    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Math.max(1, Number(req.query.page) || 1)
            const limit = Math.min(100, Number(req.query.limit) || 10)
            const published = req.query.published !== undefined
                ? req.query.published === "true" : undefined
            const [data, total] = await PostModel.findAll(page, limit, published)
            res.json({ data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } })
        } catch (err) { next(err) }
    },

    getOne: async (req: Request<IdParam>, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ error: "ID invalide" })
            const post = await PostModel.findById(id)
            if (!post) return res.status(404).json({ error: "Article introuvable" })
            res.json(post)
        } catch (err) { next(err) }
    },

    // req.body déjà validé et typé CreatePostInput par le middleware validate
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await PostModel.create(req.body as CreatePostInput)
            res.status(201).json(post)
        } catch (err) { next(err) }
    },

    // req.body déjà validé et typé UpdatePostInput par le middleware validate
    update: async (req: Request<IdParam>, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ error: "ID invalide" })
            const post = await PostModel.update(id, req.body as UpdatePostInput)
            res.json(post)
        } catch (err) { next(err) }
    },

    remove: async (req: Request<IdParam>, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ error: "ID invalide" })
            await PostModel.remove(id)
            res.status(204).send()
        } catch (err) { next(err) }
    },

}