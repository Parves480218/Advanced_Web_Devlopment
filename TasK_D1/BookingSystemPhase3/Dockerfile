# --- Base image ---
FROM node:20-alpine

# --- Create app directory ---
WORKDIR /usr/src/app

# --- Copy package files first (better caching) ---
COPY package*.json ./

# --- Install dependencies ---
RUN npm install

# --- Copy the rest of the project ---
COPY . .

# --- Expose Express port ---
EXPOSE 5000

# --- Start server ---
CMD ["node", "index.js"]
