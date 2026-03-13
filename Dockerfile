# 1. Use lightweight alpine image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy only necessary files (Backend + prepared static frontend)
# This satisfies the "necessary files only" constraint
COPY TODO/todo_backend/package*.json ./
RUN npm install --production

# 4. Copy the rest of the backend source code
COPY TODO/todo_backend/ ./

# 5. App must be accessible on port 5000 inside the container
EXPOSE 5000

# 6. Start command
CMD ["node", "server.js"]