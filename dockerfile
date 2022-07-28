FROM node:16.13.0-alpine
WORKDIR /fe
COPY ["fe/package.json", "fe/package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 80
RUN npm run build
CMD ["npm", "start", "-p", "3000"]
