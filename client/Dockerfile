# Use an official Node.js runtime as a parent image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage for the final image
FROM nginx:alpine

# Copy the build output from the previous stage to the NGINX web server
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
