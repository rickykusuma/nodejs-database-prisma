import { prismaClient } from "../src/prisma-client.js";

describe("Prisma Client", () => {
  it("should be able insert with implicit Many to Many", async () => {
    const customer = await prismaClient.customer.update({
      where: {
        id: "ricky",
      },
      data: {
        loves: {
          connect: [
            {
              id: "P0001",
            },
            {
              id: "P0002",
            },
          ],
        },
      },
      include: {
        loves: true,
      },
    });
    console.info(customer);
  });

  it("should be able to find many with implicit relation", async () => {
    const customer = await prismaClient.customer.findMany({
      where: {
        loves: {
          some: {
            name: {
              contains: "A",
            },
          },
        },
      },
      include: {
        loves: true,
      },
    });
    console.info(JSON.stringify(customer));
  });
});
