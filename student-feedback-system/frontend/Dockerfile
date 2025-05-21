# Multistage build to keep image small
FROM node:18-alpine AS build
WORKDIR /app

# Copy only frontend files
COPY index.html ./

# Final stage: use a lightweight nginx image to serve static files
FROM nginx:alpine
COPY --from=build /app/index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
