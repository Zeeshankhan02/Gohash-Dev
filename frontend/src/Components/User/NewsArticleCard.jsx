import { useState } from "react";
import { getEmbedUrl } from "../utils/youtubeIds";
import { Modal, Button } from "react-bootstrap";
import "./NewsArticleCard.css";

function NewsArticleCard({ title, youtubeIframe, description }) {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const embedUrl = getEmbedUrl(youtubeIframe);

  // Extract thumbnail from YouTube URL for better loading experience
  const getThumbnailUrl = (url) => {
    if (!url) return null;
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoId ? `https://img.youtube.com/vi/${videoId[1]}/hqdefault.jpg` : null;
  };

  const thumbnailUrl = getThumbnailUrl(youtubeIframe);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <div className="news-article-card">
        {/* Video thumbnail with play button overlay */}
        {embedUrl && (
          <div className="card-media" onClick={handleShow}>
            <div className="thumbnail-container">
              {!imageLoaded && (
                <div className="thumbnail-placeholder">
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <img
                src={thumbnailUrl}
                alt={title}
                className={`thumbnail-image ${imageLoaded ? 'loaded' : ''}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <div className="play-button-overlay">
              <div className="play-button">
                <i className="fas fa-play"></i>
              </div>
            </div>
            <div className="video-indicator">
              <i className="fas fa-video"></i> Video
            </div>
          </div>
        )}

        {/* Card content */}
        <div className="card-content">
          <h5 className="card-title">{title}</h5>
          
          {/* Read More button */}
          {description && (
            <button
              className="btn-read-more"
              onClick={handleShow}
            >
              Read More
              <i className="fas fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>

      {/* Modal with full description */}
      <Modal show={showModal} onHide={handleClose} centered size="lg" className="article-modal">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {embedUrl && (
            <div className="modal-video-container">
              <div className="ratio ratio-16x9">
                <iframe
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          <div className="article-description">
            <p>{description}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewsArticleCard;