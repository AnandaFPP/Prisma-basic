import { PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({}); // use with caution.

  const amountOfUsers = 100;

  const users: User[] = [];

  for (let i = 0; i < amountOfUsers; i++) {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()

    const user: User = {
      id: i,
      name: firstName + lastName,
      email: faker.internet.email(),
    };

    users.push(user);
  }

  const addUsers = async () => await prisma.user.createMany({ data: users });

  addUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });