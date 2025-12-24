import { prismaClient } from "../src/prisma-client.js";

describe("Prisma client", () => {
  it("should can create and select fields", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "rully1",
        email: "rully1@gmail.com",
        phone: "081231313131",
        name: "Rully Nugraha",
      },
      select: {
        id: true,
        name: true,
      },
    });
    expect(customer.id).toBe("rully1");
    expect(customer.name).toBe("Rully Nugraha");
    expect(customer.email).toBeUndefined();
    expect(customer.phone).toBeUndefined();
  });

  it("should be able find many with select fields", async () => {
    const customers = await prismaClient.customer.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    console.log(customers);
    for (const customer of customers) {
      expect(customer.id).toBeDefined();
      expect(customer.name).toBeDefined();
      expect(customer.email).toBeUndefined();
      expect(customer.phone).toBeUndefined();
    }
  });
});
