FROM node:18
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm install
ADD . .
RUN npx prisma generate
