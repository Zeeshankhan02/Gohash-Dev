// utils/youtubeIds.js
export function extractVideoId(url) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    if (parsed.searchParams.has("v")) return parsed.searchParams.get("v");
    if (parsed.pathname.startsWith("/shorts/")) return parsed.pathname.split("/shorts/")[1];
    if (parsed.pathname.startsWith("/embed/")) return parsed.pathname.split("/embed/")[1];

    return null;
  } catch {
    return null;
  }
}

// Helper if you need a full embed URL
export function getEmbedUrl(url) {
  const id = extractVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
