import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { v4 as uuidv4 } from "uuid";

const defaultData = {users: {}, products: []};
const db = new Low(new JSONFile("./db.json") , defaultData);
await db.read();

db.data.products = db.data.products.filter(p => p.id !== "06f15555-5710-41f1-8a50-bf5622cf377d");
await db.write();

// let p = db.data.products.find(p => p.id === "06f15555-5710-41f1-8a50-bf5622cf377d")
// let price = 40;
// let stock = 10;
// Object.assign(p, {price, stock});
// await db.write();

// db.data.products
//     .find(p => p.id === "06f15555-5710-41f1-8a50-bf5622cf377d")
//     .stock = 50;
// await db.write();

// let page = 1;
// let limit = 5;
// let start = (page - 1) * limit;
// let end = page * limit;
// // let data = db.data.products.sort((a,b) => b.price - a.price).slice(start, end);
// let data = db.data.products.slice(start, end).sort((a,b) => b.price - a.price);
// console.log(data);

// console.log(db.data.products.filter(p => p.title.includes("瓜")));
// console.log(db.data.products.find(p => p.title === "櫛瓜"));
// console.log(db.data.products.find(p => p.id === "06f15555-5710-41f1-8a50-bf5622cf377d"));

// console.log(db.data.products);

// const uid = uuidv4();
// const user = {
//     id: uid,
//     account: "ben",
//     password: "a12345",
//     name: "Ben Chen",
//     head: "https://randomuser.me/api/portraits/men/44.jpg"
// }
// db.data.users[uid] = user;
// await db.write();

// const product = {
//     id: uuidv4(),
//     title: "南瓜",
//     price: 150,
//     stock: 777,
//     createTime: Date.now()
// }
// await db.update(({products}) => products.push(product));

// db.data.products.push({
//     id: uuidv4(),
//     title: "小黃瓜",
//     price: 30,
//     stock: 1000,
//     createTime: Date.now()
// });
// await db.write();