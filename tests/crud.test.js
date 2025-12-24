import { prismaClient } from "../src/prisma-client.js";

it("should be able to create customer", async () => {
  const customer = await prismaClient.customer.create({
    data: {
      id: "ricky",
      email: "ricky@gmail.com",
      name: "Ricky Andrianto K",
      phone: "08121313131",
    },
  });

  expect(customer.id).toBe("ricky");
  expect(customer.email).toBe("ricky@gmail.com");
  expect(customer.phone).toBe("08121313131");
  expect(customer.name).toBe("Ricky Andrianto K");
});

it("should be able to update customer", async () => {
  const customer = await prismaClient.customer.update({
    data: {
      name: "Ricky Andrianto Kusuma",
    },
    where: {
      id: "ricky",
    },
  });
  expect(customer.id).toBe("ricky");
  expect(customer.email).toBe("ricky@gmail.com");
  expect(customer.phone).toBe("08121313131");
  expect(customer.name).toBe("Ricky Andrianto Kusuma");
});

it("should be able to read customer", async () => {
  const customer = await prismaClient.customer.findUnique({
    where: {
      id: "ricky",
    },
  });
  expect(customer.id).toBe("ricky");
  expect(customer.email).toBe("ricky@gmail.com");
  expect(customer.phone).toBe("08121313131");
  expect(customer.name).toBe("Ricky Andrianto Kusuma");
});

it("should be able to delete customer", async () => {
  const customer = await prismaClient.customer.delete({
    where: {
      id: "ricky",
    },
  });
  expect(customer.id).toBe("ricky");
  expect(customer.email).toBe("ricky@gmail.com");
  expect(customer.phone).toBe("08121313131");
  expect(customer.name).toBe("Ricky Andrianto Kusuma");
});
