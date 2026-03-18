# Use the official Node.js image as the base
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy the built files from the build step
# Note: We assume the build has already happened in Cloud Build
COPY package*.json ./
COPY dist/ ./dist/
COPY server.js ./

# Install only production dependencies
RUN npm install --omit=dev

# Set the environment variable for production
ENV NODE_ENV=production

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
