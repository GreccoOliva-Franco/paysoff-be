# build runner
FROM node:lts-alpine

WORKDIR /usr/paysoff-bff
COPY . .
RUN npm install
RUN npm run build


# Activate one of this lines to run the app (production or development) modes
# 1) Production mode
CMD [ "npm", "start"]
# 2) Development mode
# CMD [ "npm", "run", "dev" ]
