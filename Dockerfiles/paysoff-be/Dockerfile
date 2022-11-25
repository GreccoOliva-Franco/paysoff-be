# build runner
FROM node:lts-alpine

WORKDIR /usr/app
COPY . .
RUN npm install


# Activate one of this lines to run the app (production or development) modes
# Production mode
CMD [ "npm", "start"]
# Development mode
# CMD [ "npm", "run", "dev" ]
