import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "../../generated/prisma/client.js"

// Validation des variables d'env au démarrage
// Évite les erreurs silencieuses : si une var manque, on le sait immédiatement
function requireEnv(key: string): string {
    const value = process.env[key]
    if (!value) throw new Error(`Variable manquante dans .env : ${key}`)
    return value
}

// ── Driver Adapter : gère la connexion TCP avec MySQL ────────────
const adapter = new PrismaMariaDb({
    host: requireEnv("DATABASE_HOST"),
    user: requireEnv("DATABASE_USER"),
    password: requireEnv("DATABASE_PASSWORD"),
    database: requireEnv("DATABASE_NAME"),
    port: Number(process.env.DATABASE_PORT) || 3307,
    connectionLimit: 5,   // max connexions simultanées dans le pool
})

// ── Prisma Client : API de requêtes TypeScript ───────────────────
const prisma = new PrismaClient({ adapter })

export { prisma }