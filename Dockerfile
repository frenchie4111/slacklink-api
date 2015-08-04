FROM node:0.12.4

WORKDIR /app
ADD . /app
RUN rm -rf /app/node_modules
RUN npm install

EXPOSE 8080
CMD []
ENTRYPOINT ["npm", "start"]
