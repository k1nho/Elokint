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
  console.log("User has connected!");
  // check for disconnects
  socket.on("disconnect", () => {
    console.log("User has disconnected!");
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
