export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body; // Roblox JSON payload
    const discordWebhook = "https://discord.com/api/webhooks/1411307044534882427/Kmt943zW7a4lGmRzrPyE9X-KuyP41CNUG20cXfNO60Qrh0-uEB-EsUT3DCpE8AsV-Ysi"; // replace this with your Discord webhook

    await fetch(discordWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: body.title || "No Title",
            description: body.description || "No Description",
            color: body.color || 16711680,
          },
        ],
      }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send to Discord" });
  }
}
