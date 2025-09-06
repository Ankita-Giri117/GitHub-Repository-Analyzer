const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function askGemini(prompt) {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  if (!key) {
    return "⚠️ No API key found. Add VITE_GEMINI_API_KEY in .env";
  }

  try {
    const res = await fetch(`${GEMINI_URL}?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    if (!res.ok) {
      return `⚠️ Gemini API error: ${res.status}`;
    }

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No output.";
  } catch (err) {
    return `⚠️ Error: ${err.message}`;
  }
}
