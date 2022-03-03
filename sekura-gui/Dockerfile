FROM node:17-alpine

WORKDIR /app
COPY package.json /tmp
RUN npm install /tmp

volume /app
EXPOSE 3000
CMD ["./docker-run.sh"]
