const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

corsOptions = {
  cors: true,
  origins: ["http://localhost:3000"],
};

const io = new Server(server, corsOptions);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// client connection on IO instance
io.on("connection", (socket) => {
  socket.emit("message", "Welcome to Elokint");
  // broadcast an user connection (avoid the notification for the user connecting)
  socket.broadcast.emit("message", "User has joined");
  // check for disconnects
  socket.on("disconnect", () => {
    // send message to all the clients when an user disconnects
    io.emit("message", "User left the chat");
  });

  socket.on("chatMessage", (msg) => {
    //catch chat message from client and send to all other clients
    io.emit("message", msg);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
