import axios from "axios";
import { useEffect, useState } from "react";
import NewsArticleCard from "../User/NewsArticleCard";
import SubAdminNav from "./SubAdminNav";

function AllNews() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loader, setLoader] = useState(true);

  async function fetchAllNews() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/subAdmin/viewNewsArticles`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("subAdminToken")}`,
          },
        }
      );
      setNewsArticles(res.data.articlesCreated.reverse());
      setLoader(false);
    } catch (error) {
      setLoader(false);
      alert(error.response.data.msg);
    }
  }
  
  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
    <>
      <SubAdminNav />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop:"2rem"
        }}
      >
        {loader ? (
          "loading..."
        ) : newsArticles.length > 0 ? (
          <div className="container my-5 mt-18">
            <div className="row g-4">
          {newsArticles.map((article, i) => (
            <div key={i} className="col-sm-6 col-md-4">
             <NewsArticleCard title={article.title} description={article.description} youtubeIframe={article.youtubeIframe} setNewsArticles={setNewsArticles} articleId={article._id} />
            </div>
          ))}
        </div>
          </div>
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </>
  );
}

export default AllNews;
