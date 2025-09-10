import React, { useRef } from "react";
import YouTube from "react-youtube";

function HomePage() {
  // Refs to store all players
  const players = useRef([]);

  // Function to pause other videos when one plays
  const handlePlay = (index) => {
    players.current.forEach((player, i) => {
      if (player && i !== index) player.pauseVideo();
    });
  };

  // Video IDs for different sections
  const featuredVideoId = "olLaVRDoG38";
  const sideVideosIds = ["IgmvpWK9cBM", "U03a4Dwbrr4"];
  const bulletinVideosIds = ["olLaVRDoG38", "olLaVRDoG38", "olLaVRDoG38"];
  const localVideosIds = ["ysz5S6PUM-U", "jNQXAC9IVRw", "ScMzIvxBSi4", "ysz5S6PUM-U"];
  const adVideosIds = ["0KA0rF_XtL0", "Rjl9BtFIV3w"];

  const opts = {
    width: "100%",
    height: "200",
    playerVars: {
      rel: 0, // no related videos
    },
  };

  return (
    <div className="bg-light pt-5">

      {/* Featured Video */}
      <div className="container my-4">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow border-0 rounded-3 h-100">
              <YouTube
                videoId={featuredVideoId}
                opts={{ ...opts, height: "300" }}
                onReady={(e) => (players.current[0] = e.target)}
                onPlay={() => handlePlay(0)}
              />
              <div className="card-body">
                <h3 className="fw-bold">GLB | DAILY BULLETIN 09 SEP 2025 GULBARGA</h3>
                <p className="text-muted">Yahan pe latest bulletin headline aur short description hoga...</p>
              </div>
            </div>
          </div>

          {/* Side Videos */}
          <div className="col-lg-4">
            {sideVideosIds.map((id, i) => (
              <div key={i} className="card mb-3 shadow-sm border-0 rounded-3">
                <YouTube
                  videoId={id}
                  opts={{ ...opts, height: "140" }}
                  onReady={(e) => (players.current[i + 1] = e.target)}
                  onPlay={() => handlePlay(i + 1)}
                />
                <div className="card-body">
                  <h6 className="fw-semibold">Side Video {i + 1}</h6>
                  <p className="small text-muted mb-2">Short summary...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Bulletin */}
      <section className="container my-5">
        <h4 className="border-start border-4 border-danger ps-3 mb-4 fw-bold">Daily Bulletin</h4>
        <div className="row g-4">
          {bulletinVideosIds.map((id, i) => (
            <div key={i} className="col-md-4">
              <div className="card shadow-sm border-0 rounded-3 h-100">
                <YouTube
                  videoId={id}
                  opts={opts}
                  onReady={(e) => (players.current[i + sideVideosIds.length + 1] = e.target)}
                  onPlay={() => handlePlay(i + sideVideosIds.length + 1)}
                />
                <div className="card-body">
                  <h5 className="fw-bold">Bulletin Video {i + 1}</h5>
                  <p className="small text-muted">Short description...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Local Videos */}
      <section className="container my-5">
        <h4 className="border-start border-4 border-danger ps-3 mb-4 fw-bold">Local News</h4>
        <div className="row g-4">
          {localVideosIds.map((id, i) => (
            <div key={i} className="col-sm-6 col-md-3">
              <div className="card shadow-sm border-0 rounded-3 h-100">
                <YouTube
                  videoId={id}
                  opts={opts}
                  onReady={(e) => (players.current[i + sideVideosIds.length + bulletinVideosIds.length + 1] = e.target)}
                  onPlay={() => handlePlay(i + sideVideosIds.length + bulletinVideosIds.length + 1)}
                />
                <div className="card-body">
                  <h6 className="fw-semibold">Local Video {i + 1}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsored Ads */}
      <section className="container my-5">
        <h4 className="border-start border-4 border-danger ps-3 mb-4 fw-bold">Sponsored Ads</h4>
        <div className="row g-4">
          {adVideosIds.map((id, i) => (
            <div key={i} className="col-md-4">
              <div className="card shadow-sm border border-danger rounded-3 h-100">
                <YouTube
                  videoId={id}
                  opts={opts}
                  onReady={(e) =>
                    (players.current[
                      i +
                      sideVideosIds.length +
                      bulletinVideosIds.length +
                      localVideosIds.length +
                      1
                    ] = e.target)
                  }
                  onPlay={() =>
                    handlePlay(
                      i +
                        sideVideosIds.length +
                        bulletinVideosIds.length +
                        localVideosIds.length +
                        1
                    )
                  }
                />
                <div className="card-body">
                  <p>Ad Video {i + 1}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default HomePage;
