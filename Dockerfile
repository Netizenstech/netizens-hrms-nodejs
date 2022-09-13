FROM node:12.20.1 AS base

WORKDIR /opt/app
COPY src ./src
COPY config ./config
COPY migrations ./migrations
COPY .sequelizerc ./
COPY package*.json ./

WORKDIR /opt/app/
RUN npm install 
RUN npm run build

FROM node:10.13.0
WORKDIR /home/node

COPY --from=base /opt/app/node_modules ./node_modules
COPY --from=base /opt/app/dist ./dist
COPY --from=base /opt/app/config ./config
COPY --from=base /opt/app/migrations ./migrations
COPY --from=base /opt/app/package*.json ./
COPY --from=base /opt/app/.sequelizerc ./

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:3005/.well-known/apollo/server-health || exit 1
EXPOSE 3005
CMD ["npm", "start"]