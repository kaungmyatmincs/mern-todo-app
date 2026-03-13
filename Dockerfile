FROM node:18-alpine
WORKDIR /app

# Copy the backend (which now contains the static frontend build thanks to Jenkins)
COPY TODO/todo_backend ./

# Install only production dependencies
RUN npm install --production

EXPOSE 5000
CMD ["node", "server.js"]