import doenv from 'dotenv';
doenv.config();
export default (cloudinary)=>{
  type cloudType = {
    cloud_name: string,
    api_key: string,
    api_secret: string
  }
  const configValue:cloudType = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  };
    cloudinary.config(configValue);
}