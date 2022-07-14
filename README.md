## Getting Started Base Next.js skeleton For any Production Environment

# Instructions : > : after this there will be a code/Command to enter in terminal

# Packages installed and guide for Prod setups as below :

# 1) Prisma PrismaClient for Database integration with postgres

# 2) Prettier

# 3) Apollo-server-micro for GQL and Prisma

# 4) GraphQL (GQL) Server

# 5) Tailwind and typescript

# 6) PROD ESLINT Setup

# 7) Simple GIT VSCODE integration

# 8) DOTENV or cross-env

# 9) MICRO-CORS

# 10) THREE.JS

# 11) Layouts and Card

# 12) Husky

---

## STEP 1 : Install or create next-app applicationname

First, run the development server: >yarn dev > check on localhost:3000 to see if the site is running

---

## STEP 2: remove all the old code from index.js/styles etc.

---

## Step 3 : Create 2 files ->

.nvmrc - Will tell other uses of the project which version of Node is used
.npmrc - Will tell other users of the project which package manager is used

#-->You can check your version of :

#->Node : With `>node --version` and make sure you are setting the correct one.
A list of Node version codenames can be found on https://github.com/nodejs/Release/blob/main/CODENAMES.md

#-> NPM : `>NPM -v`

#-> YARN : `>YARN -v`

.npmrc - lts/Gallium
.npmrc - engine-strict=true

---

STEP 4 -> Note that the use of engine-strict didn't specifically say anything about yarn, we do that in package.json:

```
"engines": {
"node": ">=16.13.1",
"yarn": ">=1.22.18",
"npm": "please-use-yarn"
},
```

/\* Code Formatting and Quality Tools
In order to set a standard that will be used by all contributors to the project to keep the code style consistent and basic best practices followed we will be implementing two tools:

eslint - For best practices on coding standards
prettier - For automatic formatting of code files \*/

---

## STEP 5 -> Setup ESLINT

#--> GOTO .eslintrc.json and replace all with the following

```
{
    "extends": [
        "next",
        "next/core-web-vitals",
        "eslint:recommended"
    ],
    "globals": {
        "React": "readonly"
    },
}
```

#--> to add custom rules add :

```
"rules": {
"no-unused-vars": [1, { "args": "after-used", "argsIgnorePattern": "^_" }]
}
```

#--> check if lint working correctly.
`>yarn lint`

---

## STEP 6 : Setup Prettier

#--> install prettier as DEV Dependency
`>yarn add -D prettier`

#--> Install Prettier extension in your code editor (In case using VS Code check in extions TAB)

#--> Create .prettierrc and add the following :

```
{
"trailingComma": "es5",
"tabWidth": 2,
"semi": true,
"singleQuote": true
}
```

#--> Now we add a new script to package.json so we can run Prettier:

```
"scripts: {
...
"prettier": "prettier --write ."
}
```

#--> check Prettierr

`>yarn prettier`

---

## STEP 7 : Connect To GIT repository

#-->To enable Git in VS Code on Windows:
Go to File > Preferences.
Go to Settings.
Type Git: Enabled in the search bar.
Make sure that the box is ticked.
#--> Login to your GIT profile

---

## STEP 8 : HUSKY

#--> We are going to implement a tool called Husky

#--> Husky is a tool for running scripts at different stages of the git process, for example add, commit, push, etc. We would like to be able to set certain conditions, and only allow things like commit and push to succeed if our code meets those conditions, presuming that it indicates our project is of acceptable quality.

#--> To install Husky run
`>yarn add -D husky`
`>npx husky install`
The second command will create a .husky directory in your project. This is where your hooks will live. Make sure this directory is included in your code repo as it's intended for other developers as well, not just yourself.

#--> Add the following script to your package.json file:

```
"scripts: {
...
"prepare": "husky install"
}
```

This will ensure Husky gets installed automatically when other developers run the project.

#--> To create a hook run
`>npx husky add .husky/pre-commit "yarn lint" `

    The above says that in order for our commit to succeed, the yarn lint script must first run and succeed. "Succeed" in this context means no errors. It will allow you to have warnings (remember in the ESLint config a setting of 1 is a warning and 2 is an error in case you want to adjust settings).

#--> We're going to add another one:
`>npx husky add .husky/pre-push "yarn build" `

    The above ensures that we are not allowed to push to the remote repository unless our code can successfully build. That seems like a pretty reasonable condition doesn't it? Feel free to test it by committing this change and trying to push.

---

## STEP 9 : Adding Comment LINT

Lastly we are going to add one more tool.
We have been following a standard convention for all our commit messages so far, let's ensure that everyone on the team is following them as well (including ourselves!). We can add a linter for our commit messages:  
 `>yarn add -D @commitlint/config-conventional @commitlint/cli`

-->To configure it we will be using a set of standard defaults, but I like to include that list explicitly in a commitlint.config.js file since I sometimes forget what prefixes are available:

```
    // build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
    // ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
    // docs: Documentation only changes
    // feat: A new feature
    // fix: A bug fix
    // perf: A code change that improves performance
    // refactor: A code change that neither fixes a bug nor adds a feature
    // style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    // test: Adding missing tests or correcting existing tests

    module.exports = {
        extends: ['@commitlint/config-conventional'],
        rules: {
            'body-leading-blank': [1, 'always'],
            'body-max-line-length': [2, 'always', 100],
            'footer-leading-blank': [1, 'always'],
            'footer-max-line-length': [2, 'always', 100],
            'header-max-length': [2, 'always', 100],
            'scope-case': [2, 'always', 'lower-case'],
            'subject-case': [
                2,
                'never',
                ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
            ],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
                [
                'build',
                'chore',
                'ci',
                'docs',
                'feat',
                'fix',
                'perf',
                'refactor',
                'revert',
                'style',
                'test',
                'translation',
                'security',
                'changeset',
                ],
            ],
        },
    };
```

#--> enable commit lint

` >npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'`

    # Sometimes above command doesn't work in some command interpreters
    # You can try other commands below to write npx --no -- commitlint --edit $1
    # in the commit-msg file.

`npx husky add .husky/commit-msg "npx --no -- commitlint --edit '$1'" `
`npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1" `

---

## STEP 9 : VS Code Configuration

#--> Create a directory in the root of your project called .vscode and inside a file called settings.json. This will be a list of values that override the default settings of your installed VS Code.

#-->The reason we want to place them in a folder for the project is that we can set specific settings that only apply to this project, and we can share them with the rest of our team by including them in the code repository.

#--> Within settings.json we will add the following values

```{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": true,
        "source.organizeImports": true
        }
    }
```

#--> The above will tell VS Code to use your Prettier extension as the default formatter (you can override manually if you wish with another one) and to automatically format your files and organize your import statements every time you save.

#--> Add any other VSCODE extensions required :

    1. Prettier
    2. Apollo GraphQL
    3. ES7+ React/Redux/React-Native snippets
    4. npm
    5. PlantUML && PlantUML Previewer
    6. Tailwind CSS IntelliSense

---

## STEP 10 : Debugging

--> Let's set up a convenient environment for debugging our application in case we run into any issues during development.

#--> Inside of your .vscode directory create a launch.json file:

```
    {
        "version": "0.1.0",
        "configurations": [
            {
                "name": "Next.js: debug server-side",
                "type": "node-terminal",
                "request": "launch",
                "command": "YARN dev"
            },
            {
            "name": "Next.js: debug client-side",
            "type": "pwa-chrome",
            "request": "launch",
            "url": "http://localhost:3000"
            },
            {
            "name": "Next.js: debug full stack",
            "type": "node-terminal",
            "request": "launch",
            "command": "YARN dev",
            "console": "integratedTerminal",
            "serverReadyAction": {
                "pattern": "started server on .+, url: (https?://.+)",
                "uriFormat": "%s",
                "action": "debugWithChrome"
                }
            }
        ]
    }
```

#--> With that script in place you have three choices for debugging. CLick the little "bug & play icon" on the left of VS Code or press Ctrl + Shift + D to access the debugging menu. You can select which script you want to run and start/stop it with the start/stop buttons.

---

## STEP 11 : Install typescript

`> YARN ADD typescript`
`> npx touch tsconfig.json`
`> yarn add --dev @types/react`

#--> add the following to tsconfig.json
`"moduleResolution": "node",`
<--this will let you import node modules in .ts files Otherwise it Gives and error of module resolution in tsconfig.json -->

---

## STEP 12 : Install Tailwind CSS

`> YARN add -D tailwindcss postcss autoprefixer`
`> npx tailwindcss init -p`

    for rest follow guide @ https://tailwindcss.com/docs/guides/nextjs

---

## STEP 13 : `>YARN BUILD`

---

## STEP 14 : `>git commit -m 'ci: base_install_1.1'`

---

## STEP 15 : Creating an initial directory structure for our website/app.

#--> Create folders in main directory and their subfolders :

      /frontend             <-- For Frontend related content -->
      /frontend/Navbar      <-- Navigation Bar -->
      /frontend/Footer      <-- Footer directory -->
      /frontend/Layout      <-- This directory will contain any common app layouts such as navbar-->
      /frontend/UI          <-- UI Folder which will cointain UI components -->
      /frontend/UI/CARD     <-- CARD layout -->
      /frontend/UI/CAROUSEL <-- Dynamic Carousel Layout -->
      /frontend/SEO         <-- SEO Files GO here -->

      /backend              <-- For Frontend related code -->
      /backend/gql          <-- For any files related to GraphQL -->
      /backend/apollo       <-- For Apollo Server Files -->
      /backend/strapi       <-- For Headless CMS i.e. Strapi in our case -->
      /backend/prisma       <-- For Any Prisma Manual Config Files {!Do not move any Autogenerated Files} -->

---

## STEP 16 : > Create More Pages file structure

    /OLD <-- Make a folder OLD to backup old files that can be later deleted/restored -->

    /pages <-- Root Pages Directory -->
    /pages/Homepage
    /pages/Blogs
    /pages/Services
    /pages/Policies
    /pages/LOGIN
    /pages/LOGOFF
    /pages/WELCOME

    /public <-- This is where are public images, fonts etc. will go -->
    /public/fonts <-- Will Contain any custom font files -->

    /public/images <-- For website images -->
    /public/bgimg <-- For Blog Images -->
    /public/GLTF <-- Any GLTF Files for 3d Models -->

---

## STEP 17 : > .env file to save all passwords

`yarn add cross-env`
or
`yarn add dotenv`

#--> create a .env.local file in main directory as if you create and.env file it gets synced into GIT

---

## STEP 18 : Install Prisma

#--> Why Prisma ?
Prisma is used as an additional security layer to hide our postgress and its easier to import/pull and export/push data from DB.
Also It integrates very well with GraphQL.

#--> install
`> YARN add -D prisma`

#--> Intialize Prisma
`> npx prisma init`

#--> Next steps:

```
    1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read
        https://pris.ly/d/getting-started
        Check the .env file for the : DATABASE_URL="postgresql://\_username:\_password@localhost:5432/database_name?schema=public"
         Replace the username / password / port no. / database name
    2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb
        or cockroachdb.
    3. To connect to mongo db : https://www.prisma.io/docs/concepts/database-connectors/mongodb
    4. Run `>yarn prisma db pull` to turn your database schema into a Prisma schema.
        Possible error : P4001 The introspected database was empty: This comes in when the DB is empty
    5. `> yarn add @prisma/client`
    6. Run `>yarn prisma generate` to generate the Prisma Client. You can then start querying your database.
    7. To add multipe DB in prisma follow :
        ( Source : https://github.com/prisma/prisma/issues/2443 )
        You can already today connect to multiple databases with the same datamodel like so:

        datasource mydb {
            provider = "postgres"
            url = env("PG_URL")
        }
        import { PrismaClient } from '@prisma/client'

        const client1 = new PrismaClient({ datasources: { db: { url: 'postgres://localhost/db1' }} })
        const client2 = new PrismaClient({ datasources: { db: { url: 'postgres://localhost/db2' }} })

        <-- That means you can override the connection string in the PrismaClient constructor. -->

        <-- What is possible today, but not nice
            Another use-case mentioned in this issue is having different datamodels active in one application. -->

        <-- In order to do that, you would need multiple schema.prisma files and point prisma generate to those files with the --schema flag. The generators then also need to generate into custom directories instead of node_modules/@prisma/client: -->

        <-- prisma/schema1.prisma -->

        datasource db {
            provider = "postgres"
            url      = env("DB1_URL")
        }

        generator client {
            provider = "prisma-client-js"
            output   = "./generated/client1"
        }

        model Model1 {
        id         Int @id @default(autoincrement())
        model1Name String
        }

        <-- prisma/schema2.prisma -->

        datasource db {
            provider = "postgres"
            url      = env("DB2_URL")
        }

        generator client {
            provider = "prisma-client-js"
            output   = "./generated/client2"
        }

        model Model2 {
            id         Int @id @default(autoincrement())
            model2Name String
        }

        <-- In the code -->
        import { PrismaClient as PrismaClient1 } from '../prisma/generated/client1'
        import { PrismaClient as PrismaClient2 } from '../prisma/generated/client2'

        const client1 = new PrismaClient1()
        const client2 = new PrismaClient2()

        <-- In the CLI -->
        prisma generate --schema prisma/schema1.prisma
        prisma generate --schema prisma/schema2.prisma

        <-- We're aware that this solution is not nice to use and are looking into solutions to improve this experience. -->
```

---

## STEP 19 : Generate prisma client to use in app

`>npx prisma generate`

---

## STEP 20 : Create a model in schema prisma like the following example for db users :

```
    model users {
        i           Int @id @default(autoincrement())
        id          String @default("0")
        createdAt   String @default("0")
        name        String?
        email       String @unique(map: "email") @default("0")
        hash        String @default("0")
        salt        String @default("0")
        uavt        Bytes?
    }
```

---

## STEP 21 : > yarn prisma db push

#--> now you will see the following message :
`Your database is now in sync with your Prisma schema. Done in 259ms`
`✔ Generated Prisma Client (4.0.0 | library) to .\node_modules\@prisma\client in 191ms`
`Done in 7.89s.`

---

## STEP 22 : PRISMA LIB

#--> >touch backend/prisma/lib/prisma.ts

#--> paste the following code in it :

```
    import { PrismaClient } from '@prisma/client';
    let prisma: PrismaClient;
    if (process.env.NODE_ENV === 'production') {
        prisma = new PrismaClient();
        } else {
            if (!global.prisma) {
            global.prisma = new PrismaClient();
        }
        prisma = global.prisma;
    }
    export default prisma;
```

#-->Now, whenever you need access to your database you can import the prisma instance into the file where it's needed.
and add the following
`import prisma from '..backend/prisma/lib/prisma';`

#--> Example usage

```
    // index.tsx
    export const getStaticProps: GetStaticProps = async () => {
        const feed = await prisma.post.findMany({
            where: { published: true },
            include: {
                author: {
                    select: { name: true },
                },
            },
        });
    return {
        props: { feed },
        revalidate: 10,
    };
    };
```

---

## STEP 23 : NEXTAuth.js

#--> install
`>yarn add next-auth@4 @next-auth/prisma-adapter`

#--> make a database schema that is compatible with Next-Auth and paste it to prisma/schema.prisma.
Models can be found on : https://next-auth.js.org/adapters/models

#--> Below is an example :

```
    // schema.prisma
    model Post {
        id          String @id @default(cuid())
        title       String
        content     String?
        published   Boolean @default(false)
        author      User? @relation(fields: [authorId], references: [id])
        authorId    String?
    }

    model Account {
        id                  String @id @default(cuid())
        userId              String @map("user_id")
        type                String
        provider            String
        providerAccountId   String @map("provider_account_id")
        refresh_token       String?
        access_token        String?
        expires_at          Int?
        token_type          String?
        scope               String?
        id_token            String?
        session_state       String?
        oauth_token_secret  String?
        oauth_token         String?

        user User @relation(fields: [userId], references: [id], onDelete: Cascade)

        @@unique([provider, providerAccountId])
        @@map("accounts")
    }

    model Session {
        id                  String @id @default(cuid())
        sessionToken        String @unique @map("session_token")
        userId              String @map("user_id")
        expires             DateTime
        user User @relation(fields: [userId], references: [id], onDelete: Cascade)
        @@map("sessions")
    }

    model User {
        id                  String @id @default(cuid())
        name                String?
        email               String? @unique
        emailVerified       DateTime? @map("email_verified")
        image               String?
        createdAt           DateTime @default(now()) @map(name: "created_at")
        updatedAt           DateTime @updatedAt @map(name: "updated_at")
        posts Post[]
        accounts Account[]
        sessions Session[]
        @@map(name: "users")
    }

    model VerificationToken {
        identifier              String
        token                   String @unique
        expires                 DateTime
        @@unique([identifier, token])
        @@map("verificationtokens")
    }
```

---

## STEP 24 : >npx prisma db push

---

## STEP 25 : add description and keywords to package.json

Example :

```
"description": "Technical Consultant, Development Blogs",
"keywords" : ["next.js", "prisma", "website development", "google ads", "adwords", "twilio", "digital marketing"],
```

---

## STEP 26 : Install Apollo Server Micro and Nexus

#--> Apollo
`>yarn add apollo-server-micro`

#--> Nexus : used to define GQL Schema
`> yarn add nexus`

#--> create a schema.ts in gql folder

---

## STEP 27 : Install GraphQL

#-->install
`> yarn add graphql micro-cors`

---

## STEP 28 : UI Libraries

# A) Three.js

    #--> Why ? = 3d_Camera_Lightning && Because_we_can
    #-->install
    `>yarn add three @react-three/fiber`

# B) `>yarn add react-bootstrap`

# C) `>yarn add font-awesome`

# D) `>yarn add @heroicons/react`

# E) `>yarn add suneditor suneditor-react` <-- HTML BOX Type editor component -->

---

## STEP 29 : Create a Layout which will be constant in website : Footer/Navbar

#--> create a Layouts.jsx in backend/Layouts
#--> Wrap \_App.js/ts in Pages folder with Layouts

---

## STEP 30 : Apollo Client

#-->USE: to handle GQL query

#-->`>yarn add @apollo/client`

#--> create a apollo.ts in backend/apollo

#--> Paste the Following Code to create a apollo client

```
    import { ApolloClient, InMemoryCache } from '@apollo/client';

    const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
    });
    export default apolloClient;
```

#-->
A) Wrap \_App.js/ts in Pages folder with apollo client
B) If this does not load the apollo client paste the code in main \_App.js

---

## STEP 31 : Adding Other App/Website packages

# A) Facebook messenger

#-->install
`> yarn add react-messenger-customer-chat`

#--> folders frontend/fbchat

#--> create Fac.jsx

#--> add code from

> https://www.npmjs.com/package/react-messenger-customer-chat

---

## Step 32 : Adding a Generic UI element of Card Layout for app

#--> create Card.tsx in frontend/UI/Card

#--> add the following code :

```
    import classes from '../../../styles/Card.module.css';

    function Card(props) {
    return (
        <div className="CARD">
        <div className={classes.card}>{props.children}</div>
        </div>
        );
    }

export default Card;
```

#--> Create a Card.module.css in Styles folder

#--> add the following code :

```
.classes
{ background-color: forestgreen}
.card{
background-color: white;
border-radius: 10px;
box-sizing: border-box;
padding-left: 10px;
padding-right: 10px;
align-self: auto;
width: 100%;
box-shadow: 0 10px 8px rgba(0,0,0,0.2);
}
```
