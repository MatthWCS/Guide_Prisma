import { prisma } from "./src/lib/prisma.js"

async function main() {
    // Créer un utilisateur avec un post lié en une seule requête
    const user = await prisma.user.create({
        data: {
            name: "Alice",
            email: "alice@prisma.io",
            password: "password123",
            posts: {
                create: {
                    title: "Hello World",
                    slug: "hello-world",
                    content: "Mon premier post avec Prisma !",
                    published: true,
                },
            },
        },
        include: {
            posts: true,   // retourner les posts dans la réponse
        },
    })
    console.log("Utilisateur créé :", user)

    // Lire tous les utilisateurs avec leurs posts
    const allUsers = await prisma.user.findMany({
        include: { posts: true },
    })
    console.log("Tous les utilisateurs :", JSON.stringify(allUsers, null, 2))
}

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })