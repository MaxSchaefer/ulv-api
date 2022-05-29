FROM node:16-alpine AS build
WORKDIR /opt/app
COPY package* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:16-alpine AS runner
WORKDIR /opt/app
COPY package* ./
RUN npm ci --production
COPY --from=build /opt/app/dist ./dist
CMD npm run start:prod
