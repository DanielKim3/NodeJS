const socket = new WebSocket(`ws://${window.location.host}`);

//message 받기
socket.addEventListener("open", () => {
  console.log("서버에 연결되었습니다.");
});

socket.addEventListener("message", (message) => {
  console.log("New message:", message.data);
});

socket.addEventListener("close", () => {
  console.log("서버에 연결되지 않았습니다.");
});

setTimeout(() => {
  socket.send("브라우저가 나에게 인사를 다하네!");
}, 5000);
