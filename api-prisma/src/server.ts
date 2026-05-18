import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
import { env } from "./config/env.js"
import { router } from "./router/index.js"
import { errorHandler } from "./middleware/errorHandler.js"

const server = express()

// ── Middlewares globaux ──────────────────────────────────────────
server.use(cors({
    origin: env.corsOrigin,  // ex: "http://localhost:5173" (Vite)
    credentials: true,           // autoriser les cookies cross-origin
}))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())

// ── Healthcheck ──────────────────────────────────────────────────
server.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// ── Router central (toutes les routes /api/*) ────────────────────
server.use(router)

// ── 404 + erreurs (toujours en dernier) ─────────────────────────
server.use((_req, res) => res.status(404).json({ error: "Route introuvable" }))
server.use(errorHandler)

// ── Démarrage ────────────────────────────────────────────────────
server.listen(env.port, env.host, () => {
    console.log(`🚀 Serveur sur http://${env.host}:${env.port}`)
})