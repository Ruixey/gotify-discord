# Build stage
FROM denoland/deno:alpine as builder
WORKDIR /app
COPY . .
RUN deno cache main.ts

# Production stage
FROM denoland/deno:alpine
WORKDIR /app
RUN apk add --no-cache tini
COPY --from=builder /app .

# Use Tini as the init system
# Tini is a small init process that helps manage zombie processes and signal handling
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "src/main.ts"]
