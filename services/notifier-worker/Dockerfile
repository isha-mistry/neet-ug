FROM node:20-bookworm-slim
WORKDIR /app

COPY prisma ./prisma
COPY src/lib ./src/lib
COPY services/notifier-worker ./services/notifier-worker
COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps prisma @prisma/client tsx libphonenumber-js && \
    npx prisma generate

WORKDIR /app/services/notifier-worker
CMD ["npx", "tsx", "src/index.ts"]
