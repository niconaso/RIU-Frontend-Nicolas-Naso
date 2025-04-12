# Stage 1: Build Angular 18 App
FROM node:21-alpine AS builder

# Install Angular CLI globally
RUN npm install -g @angular/cli@18.0.0

WORKDIR /app

# Copy package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app for production
RUN ng build --configuration=production


# Stage 2: Run Nginx

# Defining nginx image to be used
FROM nginx:latest AS ngi
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder
COPY --from=builder /app/dist/riu-heroes-manager/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
EXPOSE 80
