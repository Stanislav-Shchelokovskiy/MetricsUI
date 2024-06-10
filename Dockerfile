FROM node:19 as build-stage

WORKDIR /root/app

ENV PATH /root/app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx
COPY --from=build-stage /root/app/build /usr/share/nginx/html
COPY --from=build-stage /root/app/nginx/conf.d /etc/nginx/conf.d