import React, { useRef, useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import { extractVideoId } from "../utils/youtubeIds";
import { Modal, Button } from "react-bootstrap";
import "./HomePage.css";

function HomePage() {
  const players = useRef([]);
  const [bulletinNews, setBulletinNews] = useState([]);
  const [generalNews, setGeneralNews] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePlay = (index) => {
    players.current.forEach((player, i) => {
      if (player && i !== index) player.pauseVideo();
    });
  };

  const opts = { width: "100%", height: "200", playerVars: { rel: 0 } };

  const fetchData = async () => {
    try {
      const [bulletinRes, generalRes, adsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/headlines`),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/general`),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/ads`),
      ]);
      setBulletinNews(bulletinRes.data.articles.reverse());
      setGeneralNews(generalRes.data.articles.reverse());
      setAds(adsRes.data.articles.reverse());
    } catch (err) {
      console.error("Error fetching homepage data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // -------------------------------
  // Card Components (with local modal)
  // -------------------------------
  const NewsCard = ({ article, index, isAd = false }) => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <div
          className={`card news-card h-100 ${isAd ? "ad-card" : ""} clickable-card`}
          onClick={() => article.description && setShowModal(true)}
        >
          {article.youtubeIframe && (
            <div className="card-img-top video-container">
              <YouTube
                videoId={extractVideoId(article.youtubeIframe)}
                opts={{ ...opts, height: "140" }}
                onReady={(e) => (players.current[index] = e.target)}
                onPlay={() => handlePlay(index)}
                className="youtube-iframe"
              />
              <div className="video-overlay">
                <div className="play-button-overlay">
                  <div className="play-button">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
                <div className="video-indicator">
                  <i className="fas fa-video"></i> Video
                </div>
              </div>
            </div>
          )}
          <div className="card-body d-flex flex-column">
            <h6 className="card-title fw-bold">{article.title}</h6>
            {article.description && (
              <button
                className="btn btn-read-more mt-auto align-self-start"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
              >
                Read More
              </button>
            )}
          </div>
        </div>

        {/* Modal for this card only */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" className="article-modal">
          <Modal.Header closeButton>
            <Modal.Title>{article.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {article.youtubeIframe && (
              <div className="modal-video-container">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractVideoId(article.youtubeIframe)}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
            <div className="article-description mt-3">
              <p>{article.description}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const FeaturedCard = ({ article }) => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <div
          className="featured-card card border-0 h-100 clickable-card"
          onClick={() => article.description && setShowModal(true)}
        >
          {article.youtubeIframe && (
            <div className="featured-video video-container">
              <YouTube
                videoId={extractVideoId(article.youtubeIframe)}
                opts={{ ...opts, height: "300" }}
                onReady={(e) => (players.current[0] = e.target)}
                onPlay={() => handlePlay(0)}
                className="youtube-iframe"
              />
              <div className="video-overlay">
                <div className="play-button-overlay">
                  <div className="play-button">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
                <div className="video-indicator">
                  <i className="fas fa-video"></i> Video
                </div>
              </div>
            </div>
          )}
          <div className="card-body">
            <h2 className="featured-title">{article.title}</h2>
            {article.description && (
              <button
                className="btn btn-read-more mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
              >
                Read Full Story
              </button>
            )}
          </div>
        </div>

        {/* Modal for featured card only */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" className="article-modal">
          <Modal.Header closeButton>
            <Modal.Title>{article.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {article.youtubeIframe && (
              <div className="modal-video-container">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractVideoId(article.youtubeIframe)}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
            <div className="article-description mt-3">
              <p>{article.description}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  // -------------------------------
  // Data splitting
  // -------------------------------
  const featuredBulletin = bulletinNews[0];
  const remainingBulletins = bulletinNews.slice(1);
  const sideVideos = generalNews.slice(0, 2);
  const remainingGeneral = generalNews.slice(2);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="homepage-wrapper">
          <div className="homepage-container">
            {featuredBulletin && (
              <section className="featured-section mt-5 mb-5">
                <div className="container">
                  <div className="row g-4">
                    <div className="col-lg-8">
                      <FeaturedCard article={featuredBulletin} />
                    </div>
                    <div className="col-lg-4">
                      <h4 className="section-subtitle mb-3">Latest Updates</h4>
                      <div className="side-videos-container d-flex flex-lg-column flex-wrap gap-3">
                        {sideVideos.map((article, i) => (
                          <div key={i} className="flex-fill" style={{ minWidth: "48%" }}>
                            <NewsCard article={article} index={i + 1} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {remainingBulletins.length > 0 && (
              <section className="section-container my-5">
                <div className="container">
                  <h3 className="section-title">Daily Bulletin</h3>
                  <div className="horizontal-scroll">
                    {remainingBulletins.map((article, i) => (
                      <NewsCard
                        key={i}
                        article={article}
                        index={i + sideVideos.length + 1}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {remainingGeneral.length > 0 && (
              <section className="section-container my-5">
                <div className="container">
                  <h3 className="section-title">Local News</h3>
                  <div className="horizontal-scroll">
                    {remainingGeneral.map((article, i) => (
                      <NewsCard
                        key={i}
                        article={article}
                        index={i + sideVideos.length + remainingBulletins.length + 1}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {ads.length > 0 && (
              <section className="section-container my-5">
                <div className="container">
                  <h3 className="section-title">Sponsored</h3>
                  <div className="horizontal-scroll">
                    {ads.map((ad, i) => (
                      <NewsCard
                        key={i}
                        article={ad}
                        index={
                          i +
                          sideVideos.length +
                          remainingBulletins.length +
                          remainingGeneral.length +
                          1
                        }
                        isAd={true}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
