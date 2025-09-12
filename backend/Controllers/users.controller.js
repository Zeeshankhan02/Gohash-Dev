import { createNewsModel } from "../Models/createNews.model.js"

export const getArticles = async (req,res) => {
  const {category} = req.params
  
  try {
    const articles = await createNewsModel.find({type:category=="headlines"?"dailyBulletin":category})

    if (!articles) {
      return res.status(404).json({
        msg:"No news article found"
      })
    }

    res.status(200).json({
      msg:"fetched successfully",
      articles:articles
    })
  } catch (error) {
    res.json({
      msg:"unable to fetch data"
    })
  }
}

export const sponsoredAds = async (req,res)=>{
  try {
    const articles = await createNewsModel.find({type:"ads"})
    if (!articles) {
      return res.status(404).json({
        msg:"No news article found"
      })
    }

    res.status(200).json({
      msg:"fetched successfully",
      articles:articles
    })
  } catch (error) {
    res.json({
      msg:"unable to fetch data"
    })
  }
}

