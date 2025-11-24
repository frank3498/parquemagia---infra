FROM node:18-alpine
WORKDIR /app
COPY backend/package.json backend/package-lock.json* ./
RUN npm install --production
COPY backend ./
COPY frontend ../frontend
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
