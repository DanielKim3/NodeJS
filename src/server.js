import http from "http";
import WebSocket from "ws";
import express from "express";
import { socket } from "dgram";

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

//connection이 생기면 socket을 받는다
function onSocketClose() {
  console.log("연결이 끊어졌습니다.");
}

// 서버에 연결하면 connection을 array안에 넣는다.
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket); // socket array에 push
  console.log("브라우저에 연결되었습니다.");
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    const messageString = message.toString("utf8");
    const parsed = JSON.parse(messageString);
    switch (parsed.type) {
      case "new_message":
        console.log(parsed, messageString);
        sockets.forEach((aSocket) => aSocket.send(parsed.payload));
      case "nickname":
        console.log(parsed.payload);
    }
  });
});

server.listen(3000, handleListen);

{
  type: "message";
  payload: "hello everyone!";
}
{
  type: "nickname";
  payload: "woojin";
}
