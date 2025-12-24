import { prismaClient } from "../src/prisma-client.js";
// Aggregate yang di dukung oleh prisma client
// _count, _min, _max, _sum, _avg kalau tidak ada kita harus melakukan manual raw SQL
describe("Prisma client", () => {
  it("should can do total count with specific name", async () => {
    const total = await prismaClient.customer.count({
      where: {
        name: "Ricky",
      },
    });
    expect(total).toBe(4);
  });

  it("should be able query using aggregate", async () => {
    const result = await prismaClient.product.aggregate({
      _avg: {
        price: true,
      },
      _min: {
        price: true,
      },
      _max: {
        price: true,
      },
    });
    console.info(result);
    expect(result._min.price).toBe(1000);
    expect(result._max.price).toBe(5000);
    expect(result._avg.price).toBe(3000);
  });
  it("should be able query using aggregate and group by", async () => {
    const result = await prismaClient.product.groupBy({
      by: ["category"],
      _avg: {
        price: true,
      },
      _min: {
        price: true,
      },
      _max: {
        price: true,
      },
    });
    console.info(result);
    for (const item of result) {
      console.info(
        `Category: ${item.category}, min: ${item._min.price}, max: ${item._max.price}, avg: ${item._avg.price}`,
      );
    }
  });

  // Pada Method Groupby terdapat attribute having yang bisa digunakan untuk kondisi HAVING pada SQL Query
  it("should can do aggregate function with group by and having", async () => {
    const result = await prismaClient.product.groupBy({
      by: ["category"],
      _avg: {
        price: true,
      },
      _min: {
        price: true,
      },
      _max: {
        price: true,
      },
      having: {
        price: {
          _avg: {
            gt: 2000,
          },
        },
      },
    });
    console.info(result);
    for (const item of result) {
      console.info(
        `Category: ${item.category}, min: ${item._min.price}, max: ${item._max.price}, avg: ${item._avg.price}`,
      );
    }
  });
});
