FROM node:10.15.3 as build
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli@7.3.9
RUN npm install
COPY . .
RUN ng build --prod

FROM nginx:1.17.8-alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
