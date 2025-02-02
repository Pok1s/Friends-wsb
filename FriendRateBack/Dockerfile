# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY .env .env
# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
#RUN npm run build

# Expose the port your application is running on (if applicable)
EXPOSE 3000

# Start your application
CMD ["npm", "start"]
