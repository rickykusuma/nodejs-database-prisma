import { prismaClient } from "../src/prisma-client.js";

describe("Prisma Client", () => {
  it("should be able to insert and include", async () => {
    const comment = await prismaClient.comment.create({
      data: {
        customer_id: "ricky",
        title: "Insert Comment",
        description: "Description Comment",
      },
      include: {
        customer: true,
      },
    });
    console.info(comment);
  });

  it("should be able insert and many relation", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "alex",
        name: "Alex",
        email: "alex@gmail.com",
        phone: "018231841",
        comments: {
          createMany: {
            data: [
              { title: "Comment 1", description: "Description 1" },
              { title: "Comment 2", description: "Description 2" },
            ],
          },
        },
      },
      include: {
        comments: true,
      },
    });
    console.info(customer);
  });

  it("should be able find many with relation", async () => {
    const customers = await prismaClient.customer.findMany({
      where: {
        comments: {
          some: {
            title: {
              contains: "Comment",
            },
          },
        },
      },
      include: {
        comments: true,
      },
    });
    console.info(customers);
  });
});
