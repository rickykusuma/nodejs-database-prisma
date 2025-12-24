import { prismaClient } from "../src/prisma-client.js";

describe("Prisma Client", () => {
  it("should be able to insert many to many relationship", async () => {
    const like = await prismaClient.like.create({
      data: {
        customer_id: "joko",
        product_id: "P0001",
      },
      include: {
        customer: true,
        product: true,
      },
    });
    console.info(like);
  });

  it("should be able find one with many to many relation", async () => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: "ricky",
      },
      include: {
        likes: {
          include: {
            product: true,
          },
        },
      },
    });
    console.info(JSON.stringify(customer));
  });

  it("should be able find many customer that like the products that contain searchKey", async () => {
    const customers = await prismaClient.customer.findMany({
      where: {
        likes: {
          some: {
            product: {
              name: {
                contains: "A",
              },
            },
          },
        },
      },
      include: {
        likes: {
          include: {
            product: true,
          },
        },
      },
    });
    console.info(JSON.stringify(customers));
  });
});
