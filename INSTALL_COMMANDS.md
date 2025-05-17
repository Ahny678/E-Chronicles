# 1. Install NestJS CLI globally (if not already installed)

npm install -g @nestjs/cli

# 2. Create NestJS Project

nest e-chronicles
cd e-chronicles

# 3. Install Prisma (ORM) & PostgreSQL client

npm install prisma --save-dev
npm install @prisma/client

# 4. Install file upload and validation libraries

npm install @nestjs/platform-express multer
npm install class-validator class-transformer

# 5. Install Cloudinary SDK

npm install cloudinary

# 6. Install rate limiting module (optional but useful)

npm install @nestjs/throttler

# 7. Install configuration management

npm install @nestjs/config
