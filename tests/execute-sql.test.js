import {prismaClient} from '../src/prisma-client.js';


// executeRaw digunakan untuk manipulasi data
describe("Prisma Client",()=>{
  it('should be able to execute sql', async () => {
    const id = "1"
    const name = "Ricky Andrianto Kusuma"

    const impacted = await prismaClient.$executeRaw`INSERT INTO sample(id, name) VALUES(${id}, ${name})`;
    expect(impacted).toBe(1)
  })
})