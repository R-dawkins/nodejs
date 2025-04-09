const express = require("express");

const feedRoutes = require("./router/feed");
const bodyParser = require("body-parser");

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded : 일반적으로 <form method:"post"> 에 의한 요청으로 제출된 데이터의 형식
app.use(bodyParser.json()); // application/json : json형식에 어울리는 파서

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.listen(8080);
