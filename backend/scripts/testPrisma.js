const prisma = require("../src/lib/prisma")

async function main() {
    const user = await prisma.user.create(
        {
            data: {
                username: "test_user_one",
                email: "tester@example.com",
                password: "notHashedYet"
            }
        }
    );
    console.log(user);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });