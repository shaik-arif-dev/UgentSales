# Use Node.js official image
FROM node:20

WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy project files
COPY . .

# Ensure the correct environment variable is used
ENV PORT=8080

# Expose the correct port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
