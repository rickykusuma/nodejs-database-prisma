import { prismaClient } from "../src/prisma-client.js";
import { PrismaClient } from "@prisma/client";

describe("Prisma Client", () => {
  it("should be able to create many records", async () => {
    const { count } = await prismaClient.customer.createMany({
      data: [
        {
          id: "joko",
          email: "joko@gmail.com",
          phone: "1231313",
          name: "joko",
        },
        {
          id: "budi",
          email: "budi@gmail.com",
          phone: "12313133",
          name: "budi",
        },
      ],
    });
  });
  it("should be able to create many records comments", async () => {
    const comments = await prismaClient.comment.createMany({
      data: [
        {
          customer_id: "ricky",
          title: "Comment 1",
          description: "Sample comment 1",
        },
        {
          customer_id: "ricky",
          title: "Comment 2",
          description: "Sample comment 2",
        },
        {
          customer_id: "budi",
          title: "Comment 1",
          description: "Sample comment 1",
        },
        {
          customer_id: "budi",
          title: "Comment 3",
          description: "Sample comment 3",
        },
      ],
    });
    console.info(comments);
  });

  // update many di prisma yang bisa berdampak ke banyak data
  // Perbedaan update single dan update many prisma

  // Update Single
  // Update single adalah prisma akan melakukan select query untuk memastikan hanya ada 1 data yang tersedia,
  // dan untuk querynya pun hanya bisa di primary key atau unique column

  // Update Many
  // bisa update dengan query column apapun karena bisa berdampak ke banyak data
  it("should be able to update many records", async () => {
    const { count } = await prismaClient.customer.updateMany({
      data: {
        email: "budilagi@gmail.com",
      },
      // kalau update single where disini harus unique, kalau many bisa apapun
      where: {
        name: "budi",
      },
    });
    expect(count).toEqual(1);
  });

  // Delete Many dan Delete Single sama seperti update many dan update single
  it("should be able to delete many records", async () => {
    const { count } = await prismaClient.customer.deleteMany({
      where: {
        name: "budi",
      },
    });
    expect(count).toBe(0);
  });

  // READ MANY
  it("should be able to read many records", async () => {
    // findMany({}) << untuk select all
    // findMany mendukung pagination dengan parameter skip dan take
    // take adalah jumlah maksimal data yang diambil (LIMIT)
    // skip adalah jumlah data yang akan di skip di awal (OFFSET)
    const customer = await prismaClient.customer.findMany({
      where: {
        name: "Ricky Andrianto Kusuma",
      },
    });
    expect(customer.length).toBe(4);
  });
  it("should be able to read many records with pagination parameter", async () => {
    const page1 = await prismaClient.customer.findMany({
      take: 1,
      skip: 0,
    });
    const page2 = await prismaClient.customer.findMany({ take: 1, skip: 1 });
    const page3 = await prismaClient.customer.findMany({ take: 1, skip: 2 });

    expect(page1.length).toBe(1);
    console.log(page1, page2, page3);
    expect(page2.length).toBe(1);
    expect(page3.length).toBe(1);
  });
  it("should be able to ready many records with sorting", async () => {
    const customers = await prismaClient.customer.findMany({
      take: 10,
      skip: 0,
      orderBy: [
        {
          name: "desc",
        },
        {
          email: "asc",
        },
      ],
    });
    console.info(customers);
    expect(customers.length).toBe(5);
  });
});
