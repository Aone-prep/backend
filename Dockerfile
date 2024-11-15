FROM node:16.15.1-bullseye
WORKDIR /app
COPY . .
RUN npm install
RUN npm install sequelize-cli -g
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all
RUN npm run build
CMD ["npm", "start"]
