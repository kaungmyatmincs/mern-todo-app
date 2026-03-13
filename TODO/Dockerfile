# 1. Use a lightweight Node.js image as required
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first to leverage Docker cache
COPY todo_backend/package*.json ./todo_backend/
COPY todo_frontend/package*.json ./todo_frontend/

# 4. Install dependencies in the appropriate folders
RUN cd todo_backend && npm install --only=production
RUN cd todo_frontend && npm install --only=production

# 5. Copy the rest of the application source code
COPY . .

# 6. The app must be accessible on port 5000 inside the container
EXPOSE 5000

# 7. Start the backend server
# Note: Ensure todo_backend/server.js is your entry point
CMD ["node", "todo_backend/server.js"]