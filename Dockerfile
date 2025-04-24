# Build stage
FROM denoland/deno:alpine as builder
WORKDIR /app
COPY . .
RUN deno cache main.ts

# Production stage
FROM denoland/deno:alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "src/main.ts"]
