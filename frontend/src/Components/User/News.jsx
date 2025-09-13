import { useState, useEffect } from "react";
import NewsArticleCard from "./NewsArticleCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./News.css";

function News() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loader, setLoader] = useState(true);
  const { category } = useParams();

  async function fetchNews() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${category}`
      );
      setNewsArticles(res.data.articles.reverse());
    } catch (error) {

      if (error.response) {
        setLoader(false)
        
      } else {
        setLoader(false)
        alert("Something went wrong");
      }
    } finally{
      setLoader(false)

    }
  }

  useEffect(() => {
    fetchNews();
  }, [category]);

  // Format category heading
  const categoryHeading = category
    ? category.charAt(0).toUpperCase() + category.slice(1) + " News"
    : "News";

  return (
    <div className="news-page-container">
      <div className="container">
        {/* Page Header */}
        <div className="news-page-header">
          <h1 className="news-category-title">{categoryHeading}</h1>
          <p className="news-category-subtitle">Latest updates and breaking news</p>
        </div>

        {loader ? (
          <div className="news-loader">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading articles...</p>
          </div>
        ) : newsArticles.length > 0 ? (
          <div className="news-grid">
            {newsArticles.map((article, index) => (
              <NewsArticleCard
                key={index}
                title={article.title}
                description={article.description}
                youtubeIframe={article.youtubeIframe}
              />
            ))}
          </div>
        ) : (
          <div className="no-articles">
            <div className="no-articles-icon">
              <i className="fas fa-newspaper"></i>
            </div>
            <h3>No articles found</h3>
            <p>Check back later for new content</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;