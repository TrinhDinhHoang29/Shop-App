//Thu vien upload start ------------------------
import cloudinary from 'cloudinary';
import streamifier from 'streamifier'
import cloudConfig from "../config/cloudinary.config";
//Thu vien upload end ------------------------

cloudConfig(cloudinary);

const  streamUpload = (buffer:string) => {
  return new Promise((resolve, reject) => {
      let stream = cloudinary.v2.uploader.upload_stream({resource_type:'auto'},
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
export const upload = async (buffer:any)=>{
  try {
    console.log("Bắt đầu upload...");
    let result = await streamUpload(buffer);
    console.log("Kết quả upload:", result);
    return result["url"];
  } catch (error) {
    console.error("Lỗi upload:", error);
    throw error;
  }
} 
