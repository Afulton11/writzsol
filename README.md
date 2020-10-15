This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. After cloning the repo, generate files from prisma & nexus:

   ```bash
   npm run generate
   # or
   yarn generate
   ```

   These files will include helpful things like schema types and a schema.graphql file.

2. Connect prisma with a postgres database. For now, create a local postgresql instance and a `.env` file within the `prisma` folder. Inside the `.env` file add, `DATABASE_URL={Your-Database-Url-Here}`. This allows prisma to communicate with the database.

3. Run Prisma migrate:

   ```bash
   npx prisma migrate up {latest-migration}
   ```

   This will create tables within your new postgres database necessary for NextAuth to run.
   The current `latest-migration` is `next-auth-models`.

4. Create a `.env.local` file in the root project directory. This file will contain sensitive data required to interact with external APIs like Google Auth or Github Auth. See more about what is needed for this file here: https://next-auth.js.org/getting-started/example

5. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Practices

Using tools like prettier, eslint, & husky will help keep clean looking code for every commit.
However, we need some conventions for managing changes on GitHub.

Generally, titles in GitHub will be _all lowercase_ using _dashes_ `-` to represent spaces.

##### For Branches:

- **feat-\*-{issue_id}** denotes a feature branch where \* is the feature's name
- **poc-\*-{issue_id}** denotes a Proof of Concept (POC) branch where \* is the POC's name.
- **bug-\*-{issue_id}** denotes a branch used to fix a bug/issue; where \* is the bug's title.
- **misc-\*-{issue_id}** denotes a miscellanous branch where \* is a short description.

Once each branch's purpose has been fulfilled, a pull request to the _main_ branch is created. This request is then reviewed and, eventually, marked as ready for merge. During merge, all commits will be squashed to represent the feature title. Finally, vercel will automatically run a new deployment.

##### For **Issues**:

- **feat-\*** identifies a feature, providing all necessary information for implementation.
- **bug-\*** identifies a bug within the application, providing any screenshots or context detailing the issue.
- **poc-\*** identifies a Proof of Concenpt (POC) that should be completed before implementing a feature.
- Further conventions for Issues may developed as time goes on.

## Learn More

- To learn more about _Writzsol_, checkout our [wiki hosted on Github](https://github.com/Afulton11/writzsol/wiki).

- To learn more about Next.js, take a look at the following resources:

  - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
  - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

  You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment on Vercel

We are using vercel to host our application during development. Check it out here: https://writzsol.vercel.app
