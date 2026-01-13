export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rawBody = req.body;
    const body = typeof rawBody === "string" ? JSON.parse(rawBody) : rawBody;

    const discordWebhook = "YOUR_DISCORD_WEBHOOK_URL_HERE";

    const response = await fetch(discordWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: body.embeds
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Discord webhook error:", err);
      return res.status(500).json({ error: "Failed to send to Discord" });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
