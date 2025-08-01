# 🖊️ E-Chronicles

## Save your memories through text, audio, videos and images in your own cloud diary! While you're at it, find a meaningful connection through personality-matching and shared creativity

---

### 📌 Introduction

**E-Chronicles** is a NestJS, GraphQL and HTTP based application designed to allow users record their life experiences while connecting to a fated match through a scoring algorithm. Top features: media-rich diary entries, and real-time notifications using Redis PubSub and WebSockets. Built with Prisma ORM and PostgreSQL, it supports JWT authentication, WebSocket-secured GraphQL subscriptions, Cloudinary media storage, and Nodemailer-based onboarding emails.

**Keywords:** NestJS penpal app, GraphQL matchmaking, Redis pubsub notifications, Cloudinary media diary, Prisma PostgreSQL backend, JWT GraphQL auth, real-time subscriptions, creative penpal diary.

---

### 🧠 Architecture Overview

📽️ **[Watch Demo](https://www.youtube.com/watch?v=9aTOhHzKJng)**

**Tech Stack Highlights:**

- 🧠 **Personality Matching** – Custom scoring algorithm with optional Jaccard index
- 🔐 **JWT Authentication** – Secure access for HTTP and WebSocket
- 📬 **Nodemailer** – Welcome emails on signup
- 📦 **Prisma ORM + PostgreSQL** – Reliable data modeling and storage
- ☁️ **Cloudinary** – Store user-uploaded images, audio, and video files
- 🧵 **GraphQL Subscriptions** – Real-time notifications via Redis PubSub
- 📚 **OpenAPI/Swagger** – API docs for REST endpoints
- 💬 **GraphQL** – All interactions happen via well-structured GraphQL queries/mutations

---

### 🛠️ Installation (For Users)

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/penpal-connect.git
   cd penpal-connect
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```bash
   cp .env.example .env
   ```

4. Fill in your credentials in `.env`:

   - PostgreSQL DB
   - Cloudinary credentials
   - JWT secret
   - Redis config

5. Run the app:

   ```bash
   npm run start:dev
   ```

6. Access GraphQL Playground at:

   [http://localhost:<port>/graphql](http://localhost:<port>/graphql)

   Or, better yet, use **[Altair](https://altairgraphql.dev/)**.

---

### 🧑‍💻 Installation (For Contributors)

1. Make sure you have:

   - Node.js v18+
   - PostgreSQL locally or via Docker
   - Redis (local or cloud)
   - Cloudinary account for media storage

2. Seed the Database:

   ```bash
   npm run seed
   ```

3. Open Swagger (if using OpenAPI docs):

   ```
   http://localhost:3000/api
   ```

4. Use GraphQL Altair to test subs:

   - Requires WebSocket-auth headers using JWT
   - Subscriptions will only work **fully** on localhost

---

### 🤝 Contributor Guidelines

- **Use NestJS CLI** and structure features via `nestjs-cli plugins`
- Ensure **test coverage** where possible (e.g. unit testing services)
- Follow NestJS’s **decorator and module** structure
- Use **DTOs** and **Swagger decorators** for consistent API docs
- Format code with Prettier/ESLint before PRs
- Avoid hardcoded values; prefer `.env` or config services

---

### ⚠️ Known Issues / Limitations

- 🔁 **GraphQL Subscriptions work only on localhost**
  Hosting providers like **Render** don’t yet support sticky WebSocket sessions (use Heroku or self-host for full support).

- 🛡️ **One PenPal per user**
  This is by design: Users can only accept a new request **when there's no existing connection**.

- 📊 **Matching algorithm** uses a basic similarity score.
  Jaccard Index logic is still in code but unused (for future experimentation).
