
# Next Blog Starter

A simple **Blog Application Starter Pack** built with **TypeScript, Express.js**.  
This project is designed for the **Next Level Web Development Bootcamp** to help learners practice Prisma hands-on by building a blog platform.

---

## Features
- TypeScript + Express.js setup
- Modular project structure
- Environment configuration with `dotenv`
- Ready to extend with blog modules (Posts, Users, etc.)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Apollo-Level2-Web-Dev/next-blog-starter.git
cd next-blog-starter
```

Install dependencies:

```bash
# using npm
npm install

# using yarn
yarn install

# using pnpm
pnpm install
```

Setup environment variables:

```bash
cp .env.example .env
```

Run the development server:

```bash
# using npm
npm run dev

# using yarn
yarn dev

# using pnpm
pnpm dev
```

---

## Folder Structure

```
Prisma-Blog/
│── node_modules/          # Dependencies
│── src/
│   ├── app.ts             # Express app configuration
│   ├── server.ts          # Server entry point
│   ├── config/            # Environment & configuration files
│   └── modules/           # Application modules (posts, users, etc.)
│── package.json           # Project metadata & scripts
│── pnpm-lock.yaml         # Lockfile (pnpm)
│── tsconfig.json          # TypeScript configuration
│── README.md              # Documentation
```

---

## Scripts

```bash
# Run in development mode
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start
```

---

## Learning Objective

This starter pack is part of the **Next Level Web Development Bootcamp** curriculum.
By using this project, students will learn how to:

* Connect a Node.js app with Prisma ORM
* Build modular APIs
* Manage environment variables
* Structure scalable backend projects

## setup 
* bun add @prisma/client
*  npx prisma generate
*  npx prisma migrate dev


<!-- how to prisma code  -->
1. create prisma schema
2. migrate schema --> npx prisma migrate dev
3. generate
4. start query


<!-- pagination -->

* query --> post?page=1&limit=3
---> go to controller 
---> const page = req.query.page and const limit = req.query.limit
---> page 1, 2, 3, 4, 5 ,... ...
---> limit 5
---> skip 0 ,5, 10, 15, 20, 25, ... ...
---> data 1-5, 6-10, 11-15, 16-20, 21-25, ... ...

---> skip=(page - 1) * limit
---> skip = (1 - 1) * 5= 0
---> skip = (2 - 1) * 5= 5
---> skip = (3 - 1) * 5= 10
---> skip = (4 - 1) * 5= 15


<!--  searching -->
* post?search=THis is post number 3
const search --> req.query.search || "";
---> using where

<!-- filtering -->
<!-- sorting -->
<!-- meta data -->

<!-- view count  -->
* fetching single data and count views increment: 1
* use transaction