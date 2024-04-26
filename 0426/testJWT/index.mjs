import jwt from "jsonwebtoken";

// const secretKey = "benbenben";

// const secretKey = process.argv[2]

// import dotenv from "dotenv";
// dotenv.config();
// const secretKey = process.env.SECRET_KEY_RESTFUL;

import { secretKey } from "./config.mjs";

const token = jwt.sign({userID: "ben123"}, secretKey);

console.log(token);