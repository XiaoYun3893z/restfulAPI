import { createRouter } from "next-connect";
import { Low } from "lowdb";
import { JSONFile} from "lowdb/node";
import { v4 as uuidv4} from "uuid";
import multer from "multer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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

router
    .use(upload.none())
    .post(async (req, res) => {
        try{
            const { account, password } = req.body;
            const user = db.data.users.find(u => u.account === account && u.password === password);
            if(user){
                const token = jwt.sign({
                    id: user.id,
                    account: user.account,
                    name: user.name,
                    mail: user.mail,
                    head: user.head
                }, secretKey, {
                    expiresIn: "30m"
                });
                res.status(201).json({
                    status: "success",
                    message: "登入成功",
                    token
                })
            }else{
                const error = new Error("找不到使用者，帳號或密碼錯誤");
                error.statusCode = 400;
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
    });

export default router.handler({
    onError: (err, req, res) => {
        console.log(err);
        res.status(err.statusCode || 500).json({
            status: "error",
            error: err.message
        })
    },
    onNoMatch: (req, res) => {
        res.status(404).json({
            status: "error", 
            error: `路由 ${req.method} ${req.url} 找不到`
        })
    }
});