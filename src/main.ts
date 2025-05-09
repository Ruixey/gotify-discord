// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
import process from "node:process";
import { WebSocket } from "ws";
import "jsr:@std/dotenv/load";

const GOTIFY_HOST = process.env.GOTIFY_HOST || "localhost";
const GOTIFY_TOKEN = process.env.GOTIFY_TOKEN;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;
const SECURE = /^(true|1|yes)$/i.test(process.env.SECURE || "");

if (GOTIFY_TOKEN === undefined) throw new Error("GOTIFY_TOKEN is required");
if (DISCORD_WEBHOOK === undefined) throw new Error("DISCORD_WEBHOOK is required");

const transformMessage = (message: string) => {
  const json = JSON.parse(message);
  return `${json.title}\n${json.message}`;
};

const runServer = (): void => {
  const ws = new WebSocket(`${SECURE ? "wss" : "ws"}://${GOTIFY_HOST}/stream`, {
    headers: { "X-Gotify-Key": GOTIFY_TOKEN },
  });

  ws.on("open", () => {
    console.log("Connected to Gotify message stream");
  });

  ws.on("message", (message: string) => {
    console.log(`Received message from server: ${message}`);

    fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: transformMessage(message),
      }),
    });
  });

  ws.on("close", () => {
    console.log("Disconnected from server");
  });
};

if (import.meta.main) {
  runServer();
}
