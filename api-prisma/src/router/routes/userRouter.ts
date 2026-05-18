import { Router } from "express"
import { UserController } from "../../controllers/user.controller.js"
import { validate } from "../../middleware/validate.js"
import { createUserSchema, updateUserSchema } from "../../schemas/user.schema.js"

export const userRouter = Router()

userRouter.get("/", UserController.getAll)
userRouter.get("/:id", UserController.getOne)
userRouter.post("/", validate(createUserSchema), UserController.create)
userRouter.patch("/:id", validate(updateUserSchema), UserController.update)
userRouter.delete("/:id", UserController.remove)