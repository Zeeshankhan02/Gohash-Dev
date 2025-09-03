import {Schema, model} from "mongoose"


const adsSchema = new Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  mobileno:{
    type:Number,
    required:true
  }
})

export const adsModel = model("AdsApplicaton",adsSchema)