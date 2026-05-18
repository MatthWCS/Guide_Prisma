import { Router } from "express"
import { PostController } from "../../controllers/post.controller.js"
import { validate } from "../../middleware/validate.js"
import { createPostSchema, updatePostSchema } from "../../schemas/post.schema.js"

export const postRouter = Router()

postRouter.get("/", PostController.getAll)
postRouter.get("/:id", PostController.getOne)
postRouter.post("/", validate(createPostSchema), PostController.create)
postRouter.patch("/:id", validate(updatePostSchema), PostController.update)
postRouter.delete("/:id", PostController.remove)