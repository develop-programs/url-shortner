# Build stage
FROM node:23-alpine3.20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build CSS
RUN npm run build:css

# Production stage
FROM node:23-alpine3.20 AS production

# Add node user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -G nodejs -u 1001

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/src ./src
COPY --from=builder --chown=nodejs:nodejs /app/views ./views
COPY --from=builder --chown=nodejs:nodejs /app/public ./public
COPY --from=builder --chown=nodejs:nodejs /app/.env ./

# Install only production dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Switch to non-root user
USER nodejs

# Set environment to production
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]