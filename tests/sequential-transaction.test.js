import { prismaClient } from "../src/prisma-client.js";

it("should be able to do sequential transaction", async () => {
  const [ricky, kusuma] = await prismaClient.$transaction(
    [
      prismaClient.customer.create({
        data: {
          id: "ricky",
          email: "ricky@gmail.com",
          name: "Ricky Andrianto Kusuma",
          phone: "08121313131",
        },
      }),
      prismaClient.customer.create({
        data: {
          id: "kusuma",
          email: "kusuma@gmail.com",
          name: "Ricky Andrianto Kusuma",
          phone: "081213131311",
        },
      }),
    ],
    {
      timeout: 5,
    },
  );
  expect(ricky.name).toBe("Ricky Andrianto Kusuma");
  expect(kusuma.name).toBe("Ricky Andrianto Kusuma");
});
