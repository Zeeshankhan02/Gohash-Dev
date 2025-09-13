import { getEmbedUrl } from "../utils/youtubeIds";
import DeleteIcon from "../Icons/DeleteIcon";

function NewsArticleCard({ title, youtubeIframe, description, articleId, setNewsArticles }) {
  const embedUrl = getEmbedUrl(youtubeIframe);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "12px 0",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
      <h5>{title}</h5>
      {location.pathname === "/secret/subAdmin/articles-created" && (
        <DeleteIcon articleId={articleId} setNewsArticles={setNewsArticles} />
      )}
      </div>

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

export default NewsArticleCard;
