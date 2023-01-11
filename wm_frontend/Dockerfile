
#FROM node:14

# Create app directory
#WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
#COPY package*.json ./

# Install app dependencies
#RUN npm install
#RUN npm install -g @angular/cli

#COPY . .

#CMD ng serve --host 0.0.0.0

FROM node:19-alpine3.16 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build -- --output-path=./dist/out 

FROM nginx:1.23.3-alpine-slim
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf