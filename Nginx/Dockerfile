FROM nginx:alpine
COPY index.html /usr/share/nginx/html
COPY cool-background.png /usr/share/nginx/html
COPY private.key /etc/
COPY ssl.crt /usr/etc/
COPY default.conf /etc/nginx/conf.d/default.conf 