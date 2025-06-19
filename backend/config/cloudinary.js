import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
const connectCloudinary = async ()=>{
 // console.log("Connecting to Cloudinary...");
  //console.log(process.env.API_SECRET_KEY)
  cloudinary.config({ 
    cloud_name: process.env.Cloudname, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET_KEY
});
}
export default connectCloudinary