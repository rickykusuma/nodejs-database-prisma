import { prismaClient } from "../src/prisma-client.js";

it("should be able to do interactive transaction", async () => {
  const [ricky, kusuma] = await prismaClient.$transaction(
    async (prisma) => {
      const ricky = await prisma.customer.create({
        data: {
          id: "ricky-interactive",
          email: "ricky-interactive@gmail.com",
          name: "Ricky Andrianto Kusuma",
          phone: "12313",
        },
      });
      const kusuma = await prisma.customer.create({
        data: {
          id: "kusuma-interactive",
          email: "kusuma-interactive@gmail.com",
          name: "Ricky Andrianto Kusuma",
          phone: "123134",
        },
      });
      return [ricky, kusuma];
    },
    {
      timeout: 5,
    },
  );
  expect(ricky.name).toBe("Ricky Andrianto Kusuma");
  expect(kusuma.name).toBe("Ricky Andrianto Kusuma");
});
