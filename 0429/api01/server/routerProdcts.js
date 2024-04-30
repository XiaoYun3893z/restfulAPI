import express from "express";
import Router from "express";


app.get("/api/products", (req, res) => {
  res.status(200).json({message: "獲取所有產品"});
});

app.post("/api/products", upload.none(), (req, res) => {
  res.status(200).json({message: "新增一個產品"});
});


app.get("/api/products/search", (req, res) => {
  const id = req.query.id
  res.status(200).json({message: `使用 ID 作為搜尋條件來搜尋產品 ${id}`});
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `獲取特定 ID 的產品 ${id}`});
});

app.put("/api/products/:id", upload.none(), (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `更新特定 ID 的產品 ${id}`});
});

app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json({message: `刪除特定 ID 的產品 ${id}`});
});

app.listen(3000, () => {
  console.log("running at http://localhost:3000");
})

export default "Router";