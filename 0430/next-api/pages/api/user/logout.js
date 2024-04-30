import { createRouter } from "next-connect";
import { Low } from "lowdb";
import { JSONFile} from "lowdb/node";
import { v4 as uuidv4} from "uuid";
import multer from "multer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import checkToken from "@/middleware/checkToken";

dotenv.config();
const secretKey = process.env.NEXT_PUBLIC_TOKEN_SECRET_KEY;

const upload = multer();

export const config = {
  api: {
    bodyParser: false
  }
}

const defaultData = {users: [], products: []};
const db = new Low(new JSONFile("./data/db.json") ,defaultData)
await db.read();

const router = createRouter();

router.get(checkToken ,(req, res) => {
    try{
        const token = jwt.sign({
            id: undefined,
            account: undefined,
            name: undefined,
            mail: undefined,
            head: undefined
        }, secretKey, {
            expiresIn: "-10s"
        });
        res.status(201).json({
            status: "success",
            message: "登出成功",
            token
        })
    }catch(error){
        console.error("處理過程當中發生錯誤", error);
        res.status(error.statusCode || 500).json({
            status: "error",
            message: "處理過程當中發生錯誤",
            error: error.message?error.message:"發生錯誤"
        });
    }
});


export default router.handler({
    onError: (err, req, res) => {
        console.log(err);
        res.status(err.statusCode || 500).json({error: err.message})
    },
    onNoMatch: (req, res) => {
        res.status(404).json({error: `路由 ${req.method} ${req.url} 找不到`})
    }
});