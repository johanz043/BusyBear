# Builds the Vite React app and serves it as a production-ready static website using Docker

# Use official Node.js image
FROM node:22

# Set working directory inside container
WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the Vite app for production
RUN npm run build

# Install a simple static server to serve the build
RUN npm install -g serve

# Expose port (Render/hosting platforms will use this)
EXPOSE 5173

# Serve the production build
CMD ["serve", "-s", "dist", "-l", "5173"]