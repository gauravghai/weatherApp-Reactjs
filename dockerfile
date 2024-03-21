# Use an official Node runtime as a base image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Use Nginx as the base image for serving static files
FROM nginx:alpine

# Copy the built app from the previous stage to the Nginx public directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# The default command to start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
