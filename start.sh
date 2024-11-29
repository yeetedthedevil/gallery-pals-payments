#!/bin/sh

# Get SSL certificate if not exists
if [ ! -f /etc/letsencrypt/live/localhost/fullchain.pem ]; then
    certbot --nginx -d localhost --non-interactive --agree-tos -m admin@example.com
fi

# Start nginx
nginx -g 'daemon off;'