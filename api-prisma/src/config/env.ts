import "dotenv/config"

function requireEnv(key: string): string {
    const value = process.env[key]
    if (!value) throw new Error(`Variable d'env manquante : ${key}`)
    return value
}

// Toutes les variables validées et typées en un seul endroit
export const env = {
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || "localhost",
    nodeEnv: process.env.NODE_ENV || "development",
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
    db: {
        host: requireEnv("DATABASE_HOST"),
        port: Number(process.env.DATABASE_PORT) || 3306,
        user: requireEnv("DATABASE_USER"),
        password: requireEnv("DATABASE_PASSWORD"),
        name: requireEnv("DATABASE_NAME"),
    },
} as const