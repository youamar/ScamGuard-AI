FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
# 🚨 终极核武器：直接用原生的 node 运行，抛弃所有 ts-node 包袱
CMD ["node", "server.mjs"]
