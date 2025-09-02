import { adsModel } from "../Models/adsApplication.model.js"

export const createAdApplication = async (req,res) => {
  const {fullname,email,mobileno} = req.body
  
  try {
    const application = await adsModel.create({
      fullname,email,mobileno
    })

    if(!application) return res.status(400).json({
      msg:"Failed to Create Ad Application"
    })

    res.status(201).json({
      msg:"Ad Application Created Successfully"
    })
  } catch (error) {
    res.status(500).json({
      msg:"Internal Server Error"
    })
  }
}