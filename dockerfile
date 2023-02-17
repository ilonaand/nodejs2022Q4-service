FROM node:16.13.2-alpine3.15

# Install fresh packages, neat trick:
# Create new layer, to make sure that changing a code doesn't require installing node modules again
COPY ./package*.json ./

COPY ./tsconfig.json ./

COPY ./tsconfig.build.json ./



# Install our dependencies
RUN  npm install && npm cache clean --force

RUN  npm i nodemon -g

RUN npm run build

# Create app directory
WORKDIR /usr/src/app

# Copy other project files to our container
COPY . /usr/src/app

EXPOSE ${PORT}

# run the app
CMD ["npm", "run", "start:dev"]