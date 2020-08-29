FROM node:10.13.0

WORKDIR /home/node

COPY --chown=node:node package.json package.json
COPY --chown=node:node yarn.lock yarn.lock

#COPY --chown=node:node . .
USER node
RUN yarn install

EXPOSE 3000

COPY --chown=node:node . .

CMD ["yarn", "start"]
