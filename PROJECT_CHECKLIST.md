## ✅ E-Chronicles Project Checklist (v1 API)

This checklist outlines the correct **step-by-step order** for building the basic REST API for the E-Chronicles project using NestJS, Prisma, PostgreSQL, and Cloudinary.

---

### 🏁 1. Project Initialization

- [ ] Create and clone GitHub repo
- [ ] Create NestJS project using `nest new server`
- [ ] Navigate into `server/` folder

---

### 📦 2. Install Dependencies

- [ ] Prisma & PostgreSQL: `npm install prisma --save-dev` + `npm install @prisma/client`
- [ ] File uploads: `npm install @nestjs/platform-express multer`
- [ ] Validation: `npm install class-validator class-transformer`
- [ ] Cloudinary SDK: `npm install cloudinary`
- [ ] Rate limiting (optional): `npm install @nestjs/throttler`
- [ ] Config management: `npm install @nestjs/config`

---

### ⚙️ 3. Environment Setup

- [ ] Create `.env` file with:

  ```env
  DATABASE_URL=
  CLOUDINARY_CLOUD_NAME=
  CLOUDINARY_API_KEY=
  CLOUDINARY_API_SECRET=
  ```

- [ ] Load `.env` via `@nestjs/config` in `AppModule`

---

### 🧬 4. Prisma Setup

- [ ] Run `npx prisma init`
- [ ] Define models in `prisma/schema.prisma`
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Generate client with `npx prisma generate`

---

### 🧱 5. Prisma Service

- [ ] Generate `prisma` module and service
- [ ] Implement `PrismaService` with `onModuleInit` and `onModuleDestroy`

---

### 📁 6. Feature Module

- [ ] Create `Diary` module, controller, and service (`nest g module`, `g controller`, `g service`)
- [ ] Define CRUD endpoints for diary entries

---

### 🧼 7. Validation

- [ ] Enable global validation pipe in `main.ts`:

  ```ts
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  ```

---

### 🎥 8. File Upload Support

- [ ] Set up `@nestjs/platform-express` with Multer
- [ ] Add `@UseInterceptors(FileInterceptor(...))` to relevant endpoints
- [ ] Handle audio/image/video uploads

---

### ☁️ 9. Cloudinary Integration

- [ ] Create reusable Cloudinary helper (e.g. `cloudinary.ts`)
- [ ] Upload media/voice to Cloudinary in service logic

---

### ⚡ 10. Rate Limiting (Optional)

- [ ] Import and configure `ThrottlerModule` in `AppModule`
- [ ] Use `@Throttle()` decorator on controllers or routes

---

### 🧪 11. Testing & Debugging

- [ ] Test API with Postman or Insomnia
- [ ] Ensure upload, validation, and DB save all work correctly
- [ ] Use Prisma Studio (`npx prisma studio`) to view records

---

### 🧹 12. Cleanup and Documentation

- [ ] Add `.env.example` to repo
- [ ] Add `INSTALL_COMMANDS.md` for all npm installs
- [ ] Add `PROJECT_CHECKLIST.md` (this file)
- [ ] Push to GitHub regularly

---

Let me know if you'd like a template for your `README.md` too!
