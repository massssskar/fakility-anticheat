export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body; // Roblox sends { embeds = { { title, description, color } } }

    const discordWebhook = "YOUR_DISCORD_WEBHOOK_URL_HERE"; // <-- put your Discord webhook URL here

    // Forward EXACTLY what Roblox sent
    const send = await fetch(discordWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: body.embeds // send embeds directly to Discord
      }),
    });

    if (!send.ok) {
      const err = await send.text();
      console.error("Discord error:", err);
      return res.status(500).json({ error: "Failed to send to Discord" });
    }

    return res.status(200).json({ success: true });

  } catch (e) {
    console.error("Webhook error:", e);
    return res.status(500).json({ error: "Internal error" });
  }
}
