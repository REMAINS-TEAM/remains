FROM node:16.13.0-alpine
WORKDIR /fe
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY . .
EXPOSE 80
RUN npm run build
CMD ["npm", "start", "-p", "3000"]
