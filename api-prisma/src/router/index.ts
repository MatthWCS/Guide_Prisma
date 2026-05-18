import { Router } from "express"
import { userRouter, postRouter, tagRouter } from "./routes/index.js"

export const router = Router()

// Tous les préfixes /api/* sont définis ici, nulle part ailleurs
router.use("/api/users", userRouter)
router.use("/api/posts", postRouter)
router.use("/api/tags", tagRouter)

// Ajouter ici chaque nouvelle ressource :
// router.use("/api/auth", authRouter)