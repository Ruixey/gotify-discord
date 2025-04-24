# gotify-discord

A tool to connect gotify to discord!

## Getting started

Either build and run yourself, or use it as a docker image. To provide config, you can pass environment variables:

- `GOTIFY_HOST` is the `IP[:PORT]` of your Gotify server.
- `GOTIFY_TOKEN` is a token created from the `client` section of Gotify.
- `DISCORD_WEBHOOK` is a [Discord webook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) URL
- `SECURE` choose whether to use wss:// or ws://

Using `docker compose`:

```yaml
---
services:
  gotify-discord:
    init: true
    image: gotify-discord:latest
    container_name: gotify-discord
    environment:
      - GOTIFY_HOST=<hostname>
      - GOTIFY_TOKEN=<client_token>
      - DISCORD_WEBHOOK=<webhook_url>
      - SECURE=true # using https?
    restart: unless-stopped
```

## Build it yourself

1. Clone repo
2. Run `deno task dev`
