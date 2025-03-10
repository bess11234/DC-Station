FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm i & npm run build

EXPOSE 3000

CMD ["npm", "run", "publish"]