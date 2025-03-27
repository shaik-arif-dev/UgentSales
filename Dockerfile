# Use the official Node.js image as the base
FROM node:20

# Set the working directory in the container
WORKDIR /server/index.ts



# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
# RUN npm install

RUN yarn install

#RUN npm update typescript


# npm audit fix --force

# Copy the rest of the application code
COPY . .

RUN yarn build



# Run the app
CMD ["npm", "start"]

# Expose the port the app runs on
EXPOSE 8080
