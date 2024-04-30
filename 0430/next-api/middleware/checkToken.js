import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.NEXT_PUBLIC_TOKEN_SECRET_KEY;

const checkToken = async (req, res, next) => {
    try{
        let token = req.headers["authorization"];
        if(token && token.startsWith("Bearer ")){
          token = token.slice(7);

          const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (err, decoded) => {
                if(err){
                    const error = new Error("登入驗證失效，請重新登入");
                    error.statusCode = 401;
                    throw error;
                    reject(undefined);
                }else{
                    resolve(decoded)
                }
            });
          })
          req.decoded = decoded;
          next();
        }else{
          const error = new Error("無登入驗證資料，請重新登入");
          error.statusCode = 401;
          throw error;
        }
    }catch(error){
        console.error("處理過程當中發生錯誤", error);
        res.status(error.statusCode || 500).json({
            status: "error",
            message: "處理過程當中發生錯誤",
            error: error.message?error.message:"發生錯誤"
        });
    }
}

export default checkToken;