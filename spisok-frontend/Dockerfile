FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
# server.mjs bundles its dependencies, so only the dist folder is needed
COPY --from=build /app/dist/spisok-frontend ./dist/spisok-frontend
EXPOSE 4000
CMD ["node", "dist/spisok-frontend/server/server.mjs"]