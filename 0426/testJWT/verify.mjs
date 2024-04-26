import jwt from "jsonwebtoken";

// const secretKey = "benbenben";

// const secretKey = process.argv[2]

// import dotenv from "dotenv";
// dotenv.config();
// const secretKey = process.env.SECRET_KEY_RESTFUL;

import { secretKey } from "./config.mjs";


let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJiZW4xMjMiLCJpYXQiOjE3MTQwOTYxMzZ9.5-VHQBAINpbtYDctHc-u7Qk7Ozo42gPlP_3o8LYcQgQ";

jwt.verify(token, secretKey, (err, data) => {
  if (err) {
    console.log("驗證失敗");
    return false;
  }
  console.log("驗證成功");
  console.log(data);
});
