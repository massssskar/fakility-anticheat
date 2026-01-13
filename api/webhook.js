export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        console.log("Received webhook:", data);
        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
