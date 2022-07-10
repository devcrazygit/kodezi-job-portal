# Pull the Node image from Docker Hub
FROM node:14-slim

# Setting Working Directory
WORKDIR /usr/app

# Copying only package.json
COPY package*.json ./package*.json
COPY .env ./

# Install Dependencies
RUN npm install

# Copy rest of the code to container
COPY . .

EXPOSE 3000

# Run the React app
CMD ["npm", "run", "start"]
# CMD ["tail -F /dev/null"]



