import { createRouter } from "next-connect";
import { Low } from "lowdb";
import { JSONFile} from "lowdb/node";
import { v4 as uuidv4} from "uuid";
import multer from "multer";

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

router.get((req, res) => {
    try{
        const users = db.data.users.map(u => {
            const {password, ...newUser} = u;
            return newUser;
        });
        res.status(200).json({
            status: "success",
            users
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

router
    .use(upload.none())
    .post(async (req, res) => {
        try{
            const { account, password, name, mail, head} = req.body;
            let result = db.data.users.find(u => u.account === account);
            let newError;
            if(result){
                newError = new Error("帳號已經有人使用");
                newError.statusCode = 400;
                throw newError;
            }
            result = db.data.users.find(u => u.mail === mail);
            if(result){
                newError = new Error("信箱已經被註冊過");
                newError.statusCode = 400;
                throw newError;
            }
            const id = uuidv4();
            const user = {id, account, password, name, mail, head};
            await db.update(({users}) => users.push(user));
            res.status(201).json({
                status: "success",
                message: "註冊成功",
                id
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

// 錯的寫法，要寫到對應的實體檔案
// router.post("/login", (req, res) => {
//     res.status(200).json({ message: "使用者登入" });
// });

// router.get("/logout", (req, res) => {
//     res.status(200).json({ message: "使用者登出" });
// });

// router.get("/status", (req, res) => {
//     res.status(200).json({ message: "檢查使用者的登入狀態" });
// });

export default router.handler({
    onError: (err, req, res) => {
        console.log(err);
        res.status(err.statusCode || 500).json({error: err.message})
    },
    onNoMatch: (req, res) => {
        res.status(404).json({error: `路由 ${req.method} ${req.url} 找不到`})
    }
});