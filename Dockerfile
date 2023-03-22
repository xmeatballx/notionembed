FROM node:16
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci
ADD . .
RUN npm run build
CMD npm start