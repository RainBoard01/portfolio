FROM node:16 as dependencies
WORKDIR /portfolio
COPY package.json ./
RUN npm install

FROM node:16 as builder
WORKDIR /portfolio
COPY . .
COPY --from=dependencies /portfolio/node_modules ./node_modules
RUN npm build

FROM node:16 as runner
WORKDIR /portfolio
ENV NODE_ENV production
COPY --from=builder /portfolio/next.config.js ./
COPY --from=builder /portfolio/public ./public
COPY --from=builder /portfolio/.next ./.next
COPY --from=builder /portfolio/node_modules ./node_modules
COPY --from=builder /portfolio/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]