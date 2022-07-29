FROM node:16.13.0-alpine
WORKDIR /fe
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start", "-p", "8080"]
