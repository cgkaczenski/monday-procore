import { Hono } from "hono";

const app = new Hono();

app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    console.log("Received webhook data from Monday.com:", body);

    if (body.challenge) {
      console.log("Responding to challenge:", body.challenge);
      return c.json({ challenge: body.challenge });
    }

    if (body.event.type === "create_pulse") {
      const itemId = body.event.pulseId;
      const itemName = body.event.pulseName;
      console.log(`New item created: ID: ${itemId}, Name: ${itemName}`);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return c.json({ success: false, error: "Invalid webhook payload" }, 400);
  }
});

export default app;
