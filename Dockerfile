FROM node:16
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm install
ADD . .
RUN npx prisma generate
