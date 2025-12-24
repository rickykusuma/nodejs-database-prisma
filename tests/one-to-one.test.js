import { prismaClient } from "../src/prisma-client.js";

describe("Prisma Client", () => {
  it("should be able to create one to one", async () => {
    const wallet = await prismaClient.wallet.create({
      data: {
        id: "ricky",
        customer_id: "ricky",
        balance: 1000000,
      },
      // gunakan include untuk dapat relasi one to one nya
      include: {
        customer: true,
      },
    });
    console.info(wallet);
  });
  it("should be able to create one to one with relation", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "joko2",
        name: "Joko 2",
        email: "joko2@gmail.com",
        phone: "0812391",
        wallet: {
          create: {
            id: "joko2",
            balance: 500000,
          },
        },
      },
      include: {
        wallet: true,
      },
    });
    console.info(customer);
  });
  it("should be able to find one to one", async () => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: "ricky",
      },
      include: {
        wallet: true,
      },
    });
    console.info(customer);
  });

  // Check Filter Relation di Official Site
  it("should be able to find many one to one", async () => {
    const customers = await prismaClient.customer.findMany({
      where: {
        wallet: {
          isNot: null,
        },
      },
      include: {
        wallet: true,
      },
    });
    console.info(customers);
  });
});
