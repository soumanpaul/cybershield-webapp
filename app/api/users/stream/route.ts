import { createListenerClient, ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const encoder = new TextEncoder();

export async function GET(request: Request) {
  try {
    await ensureSchema();
    const client = createListenerClient();
    await client.connect();
    await client.query("LISTEN cybershield_users");

    let heartbeat: ReturnType<typeof setInterval>;
    let closed = false;
    let cleanUp = async () => {};

    const stream = new ReadableStream({
      start(controller) {
        const send = (event: string, data: string) => {
          if (!closed) controller.enqueue(encoder.encode(`event: ${event}\ndata: ${data}\n\n`));
        };

        cleanUp = async () => {
          if (closed) return;
          closed = true;
          clearInterval(heartbeat);
          client.removeAllListeners("notification");
          try {
            await client.query("UNLISTEN cybershield_users");
          } finally {
            await client.end();
          }
        };

        client.on("notification", (message) => {
          if (message.channel === "cybershield_users" && message.payload) {
            send("user.created", message.payload);
          }
        });

        send("connected", JSON.stringify({ connectedAt: new Date().toISOString() }));
        heartbeat = setInterval(() => send("heartbeat", "{}"), 20_000);
        request.signal.addEventListener("abort", () => void cleanUp(), { once: true });
      },
      cancel() {
        void cleanUp();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("GET /api/users/stream", error);
    return Response.json({ error: "Live stream unavailable" }, { status: 503 });
  }
}
