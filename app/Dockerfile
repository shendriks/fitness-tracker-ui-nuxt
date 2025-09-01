# Local development Dockerfile for Nuxt app with hot reloading
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Environment for dev and reliable file watching inside Docker on Windows/Mac
ENV NODE_ENV=development \
    CHOKIDAR_USEPOLLING=1

# Install dependencies first (leverage Docker layer cache)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app (useful if not mounting volume)
COPY . .

# Expose Nuxt dev port
EXPOSE 3000

# Run dev server and bind to all interfaces for container access
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
