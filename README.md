# Node.js Database Prisma

Simple learning repository to understand **database fundamentals using Prisma ORM with PostgreSQL** in a Node.js
environment.

This repo focuses on **how Prisma works internally** through direct usage, raw queries, relations, and transactions —
not on building an API or framework abstraction.

---

## Tech Stack

- Node.js
- Prisma ORM
- PostgreSQL
- JavaScript
- SQL

---

## What This Repository Covers

### Prisma Basics

- Prisma Client usage
- CRUD operations
- Select vs include
- Filtering with `where`
- Aggregation (`count`, `avg`, `min`, `max`)
- `groupBy`

### Relations

- One-to-One
- One-to-Many
- Many-to-Many
- Implicit Many-to-Many

### Raw SQL

- `queryRaw`
- `executeRaw`
- Mixing Prisma with raw SQL safely

### Transactions

- Sequential transactions
- Interactive transactions

### Database Concepts

- Schema definition
- Relations & constraints
- SQL structure awareness

---

## Project Structure

├── prisma/\
│ ├── schema.prisma\
│ └── database.sql\
├── tests/\
│ ├── crud.test.js\
│ ├── aggregate.test.js\
│ ├── queryraw-sql.test.js\
│ ├── one-to-many.test.js\
│ ├── many-to-many.test.js\
│ ├── transaction.test.js\
│ └── ...\
├── package.json\
└── README.md\

---

## Setup

1. Install dependencies\
   ```npm install```
2. Configure database\
   ```DATABASE_URL="postgresql://user:password@localhost:5432/dbname"```
3. Generate Prisma Client\
   ```npx prisma generate```
4. Run tests\
   ```npx jest```

---

## Learning Goal

- Understand how Prisma maps to SQL
- Know when to use ORM vs raw SQL
- Build strong database intuition before frameworks
- Prepare for backend production systems

---

## Notes

- This is **not** a production-ready app.
- No Express / NestJS abstraction.
- Focus is **database behavior and correctness**, not UI or API.

