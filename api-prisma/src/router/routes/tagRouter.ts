import { Router } from "express"
import { TagController } from "../../controllers/tag.controller.js"
import { validate } from "../../middleware/validate.js"
import { createTagSchema, updateTagSchema } from "../../schemas/tag.schema.js"

export const tagRouter = Router()

tagRouter.get("/", TagController.getAll)
tagRouter.get("/:id", TagController.getOne)
tagRouter.post("/", validate(createTagSchema), TagController.create)
tagRouter.patch("/:id", validate(updateTagSchema), TagController.update)
tagRouter.delete("/:id", TagController.remove)