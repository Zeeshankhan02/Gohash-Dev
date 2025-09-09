function NewsArticleCard({ title, youtubeIframe, description }) {

  function getYouTubeEmbedUrl(url) {
    if (!url) return null;
  
    try {
      const parsedUrl = new URL(url);
  
      // Case 1: Short link (youtu.be/VIDEO_ID)
      if (parsedUrl.hostname === "youtu.be") {
        const videoId = parsedUrl.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }
  
      // Case 2: Normal watch link (youtube.com/watch?v=VIDEO_ID)
      if (parsedUrl.searchParams.has("v")) {
        const videoId = parsedUrl.searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      }
  
      // Case 3: Shorts (youtube.com/shorts/VIDEO_ID)
      if (parsedUrl.pathname.startsWith("/shorts/")) {
        const videoId = parsedUrl.pathname.split("/shorts/")[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
  
      // Case 4: Already an embed link
      if (parsedUrl.pathname.startsWith("/embed/")) {
        return url;
      }
  
      // Fallback: return original
      return url;
    } catch (e) {
      console.warn("Invalid YouTube URL:", url);
      return null;
    }
  }
  

  const embedUrl = getYouTubeEmbedUrl(youtubeIframe);

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      margin: "12px 0",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h3>{title}</h3>

      {embedUrl && (
        <iframe
          width="100%"
          height="315"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}

      {description && <p>{description}</p>}
    </div>
  );
}

export default NewsArticleCard