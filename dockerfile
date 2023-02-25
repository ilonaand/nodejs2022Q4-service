FROM node:18-alpine

# Install fresh packages, neat trick:
# Create new layer, to make sure that changing a code doesn't require installing node modules again
COPY ./package*.json ./

COPY ./tsconfig.json ./

COPY ./tsconfig.build.json ./



# Install our dependencies
RUN  npm install --force

# RUN npm run build

# Create app directory


# Copy other project files to our container
COPY . .

EXPOSE ${PORT}

# run the app
CMD ["npm", "run", "start:dev:nodemon"]