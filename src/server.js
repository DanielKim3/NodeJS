import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

//pug로 view engine을 설정
app.set("view engine", "pug");
//express에 template이 어디 있는지 지정
app.set("views", __dirname + "/views");
//public url을 생성해서 유저에게 파일을 공유
app.use("/public", express.static(__dirname + "/public"));
//home.pug를 render 해주는 route hanlder
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function handleConnection(frontSocket) {
  console.log(frontSocket);
}

wss.on("connection", handleConnection);

server.listen(3000, handleListen);
