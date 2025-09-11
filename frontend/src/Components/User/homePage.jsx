import React, { useRef, useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import { extractVideoId } from "../utils/youtubeIds";

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

  const opts = {
    width: "100%",
    height: "200",
    playerVars: { rel: 0 },
  };

  async function fetchData() {
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
  }

  useEffect(() => {
    fetchData();

    // Auto-fetch new articles every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center my-5">Loading...</p>;
  }

  const featuredBulletin = bulletinNews[0];
  const remainingBulletins = bulletinNews.slice(1);
  const sideVideos = generalNews.slice(0, 2);
  const remainingGeneral = generalNews.slice(2);

  return (
    <div className="bg-light pt-5">

      {/* Featured Video */}
      {featuredBulletin && (
        <div className="container my-4">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card shadow border-0 overflow-hidden rounded-3 h-100">
                <YouTube
                  videoId={extractVideoId(featuredBulletin.youtubeIframe)}
                  opts={{ ...opts, height: "300" }}
                  onReady={(e) => (players.current[0] = e.target)}
                  onPlay={() => handlePlay(0)}
                />
                <div className="card-body">
                  <h3 className="fw-bold">{featuredBulletin.title}</h3>
                  <p className="text-muted">{featuredBulletin.description}</p>
                </div>
              </div>
            </div>

            {/* Side Videos */}
            {sideVideos.length > 0 && (
              <div className="col-lg-4">
                {sideVideos.map((article, i) => (
                  <div key={i} className="card mb-3 shadow-sm overflow-hidden border-0 rounded-3">
                    <YouTube
                      videoId={extractVideoId(article.youtubeIframe)}
                      opts={{ ...opts, height: "140" }}
                      onReady={(e) => (players.current[i + 1] = e.target)}
                      onPlay={() => handlePlay(i + 1)}
                    />
                    <div className="card-body">
                      <h6 className="fw-semibold">{article.title}</h6>
                      <p className="small text-muted mb-2">{article.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Daily Bulletin */}
      {remainingBulletins.length > 0 && (
        <section className="container my-5">
          <h4 className="border-start border-4 border-danger ps-3 mb-4 fw-bold">Daily Bulletin</h4>
          <div className="row g-4">
            {remainingBulletins.map((article, i) => (
              <div key={i} className="col-md-4">
                <div className="card shadow-sm overflow-hidden border-0 rounded-3 h-100">
                  <YouTube
                    videoId={extractVideoId(article.youtubeIframe)}
                    opts={opts}
                    onReady={(e) => (players.current[i + sideVideos.length + 1] = e.target)}
                    onPlay={() => handlePlay(i + sideVideos.length + 1)}
                  />
                  <div className="card-body">
                    <h5 className="fw-bold">{article.title}</h5>
                    <p className="small text-muted">{article.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Local News */}
      {remainingGeneral.length > 0 && (
        <section className="container my-5">
          <h4 className="border-start border-4 border-danger ps-3 mb-4 fw-bold">Local News</h4>
          <div className="row g-4">
            {remainingGeneral.map((article, i) => (
              <div key={i} className="col-sm-6 col-md-3">
                <div className="card shadow-sm overflow-hidden border-0 rounded-3 h-100">
                  <YouTube
                    videoId={extractVideoId(article.youtubeIframe)}
                    opts={opts}
                    onReady={(e) =>
                      (players.current[i + sideVideos.length + remainingBulletins.length + 1] = e.target)
                    }
                    onPlay={() => handlePlay(i + sideVideos.length + remainingBulletins.length + 1)}
                  />
                  <div className="card-body">
                    <h6 className="fw-semibold">{article.title}</h6>
                    <p className="small text-muted text-truncate">{article.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sponsored Ads */}
      {ads.length > 0 && (
        <section className="container my-5">
          <h4 className="border-start border-4 border-danger ps-3 mb-4 fw-bold">Sponsored Ads</h4>
          <div className="row g-4">
            {ads.map((ad, i) => (
              <div key={i} className="col-md-4">
                <div className="card shadow-sm overflow-hidden rounded-3 h-100">
                  <YouTube
                    videoId={extractVideoId(ad.youtubeIframe)}
                    opts={opts}
                    onReady={(e) =>
                      (players.current[
                        i + sideVideos.length + remainingBulletins.length + remainingGeneral.length + 1
                      ] = e.target)
                    }
                    onPlay={() =>
                      handlePlay(
                        i + sideVideos.length + remainingBulletins.length + remainingGeneral.length + 1
                      )
                    }
                  />
                  <div className="card-body">
                    <p>{ad.title}</p>
                    <p>{ad.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Extract video ID helper


export default HomePage;
