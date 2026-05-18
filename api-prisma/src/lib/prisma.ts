import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "../../generated/prisma/client.js"
import { env } from "../config/env.js"

// ── Driver Adapter : gère la connexion TCP avec MySQL ────────────
const adapter = new PrismaMariaDb({
    host: env.db.host,
    user: env.db.user,
    password: env.db.password,
    database: env.db.name,
    port: env.db.port,
    connectionLimit: 5,   // max connexions simultanées dans le pool
    allowPublicKeyRetrieval: true, // nécessaire pour MySQL 8+ avec auth caching_sha2_password
})

// ── Prisma Client : API de requêtes TypeScript ───────────────────
const prisma = new PrismaClient({ adapter })

export { prisma }