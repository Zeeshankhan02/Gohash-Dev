import { useState,useEffect } from "react";
import NewsArticleCard from "./NewsArticleCard";
import { useParams } from "react-router-dom";
import axios from "axios";

function News() {
  
  const [newsArticles, setNewsArticles] = useState([]);
  const [loader,setLoader] = useState(true)
  const {category} = useParams()
  
  async function fetchNews() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${category}`, // category -> general news or bulletin news
      );
      console.log(res.data);
    
      setNewsArticles(res.data.articles.reverse());
      setLoader(false)
    } catch (error) {
      if (error.response) {
        // alert(error.response.data);
        console.log("failed");
        setLoader(false)
        
      } else {
        setLoader(false)
        alert("Something went wrong");
      }
    } finally{
      setLoader(false)
    }
  }

  useEffect(()=>{
    fetchNews()
  },[category]) // re-fetches if the category changes


  return (
    <div style={{height:"100vh"}}>
      
      {loader?"loading...":newsArticles.length > 0 ? (
          <div  >
            {newsArticles.map((article, index) => (
              <div key={index}>
                <NewsArticleCard title={article.title} description={article.description} youtubeIframe={article.youtubeIframe}/>
              </div>
            ))}
          </div>
        ) : (
          <p >
            No articles found
          </p>
        )}

    </div>
  )
}

export default News