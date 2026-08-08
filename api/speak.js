export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, voice } = req.body || {};
  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  // Whitelist of allowed voices
  const VOICES = {
    sarah: "b6nVfb3l2zshrLZTvqbs",
    patrick: "XTyroWkQl32ZSd3rRVZ1",
  };
  const VOICE_ID = VOICES[voice] || VOICES.sarah;

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server missing API key" });
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=31536000");
    return res.status(200).send(buffer);
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
