FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

# Install certbot
RUN apk add --no-cache certbot

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy SSL auto-renewal script
COPY ssl-renew.sh /etc/periodic/daily/ssl-renew
RUN chmod +x /etc/periodic/daily/ssl-renew

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80 443

CMD ["/start.sh"]