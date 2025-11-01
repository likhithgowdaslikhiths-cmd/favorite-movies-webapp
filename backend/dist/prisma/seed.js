"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.movie.createMany({
        data: [
            {
                title: 'Inception',
                type: 'Sci-Fi',
                director: 'Christopher Nolan',
                budget: '160000000', // ✅ string
                location: 'USA',
                duration: '148min',
                yearTime: '2010'
            },
            {
                title: 'Interstellar',
                type: 'Sci-Fi',
                director: 'Christopher Nolan',
                budget: '165000000', // ✅ string
                location: 'USA',
                duration: '169min',
                yearTime: '2014'
            }
        ],
    });
    console.log('✅ Movies seeded successfully');
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
