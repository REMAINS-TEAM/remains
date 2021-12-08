"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database');
    await prisma.category.createMany({
        data: [
            {
                id: 1,
                title: 'First',
            },
            {
                id: 2,
                title: 'Second',
            },
            {
                id: 3,
                title: 'First-first',
                parentId: 1,
            },
            {
                id: 4,
                title: 'First-first-first',
                parentId: 3,
            },
            {
                id: 5,
                title: 'First-first-second',
                parentId: 4,
            },
        ],
    });
    console.log('Done');
    return;
}
main()
    .catch((e) => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
});
//# sourceMappingURL=init.js.map