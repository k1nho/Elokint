const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const formatMessage = require("./Utils/format");

// allow cross origin connection between frontend and backend
app.use(cors());
// allow json
app.use(express.json());

// ROUTES

//AUTH ROUTE
app.use("/auth", require("./routes/authjwt"));

//VERIFICATION ROUTE
app.use("/dashboard", require("./routes/dashboard"));

// SOCKET
corsOptions = {
  cors: true,
  origins: ["http://localhost:3000/chat"],
};
const io = new Server(server, corsOptions);
const bot = "Kint Bot";

// client connection on IO instance
io.use((socket, next) => {
  const jwtToken = socket.handshake.auth.jwtToken.token;
  if (jwtToken) {
    jwt.verify(jwtToken, process.env.jwtsecret, (err, decoded) => {
      if (err) return next(new Error("Authentication Error"));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", (socket) => {
  socket.emit("message", formatMessage(bot, "Welcome to Elokint", ""));
  // broadcast an user connection (avoid the notification for the user connecting)
  socket.broadcast.emit("message", formatMessage(bot, "User has joined", ""));

  socket.on("chatMessage", (msg, user, elokintAuto) => {
    //catch chat message from client and send to all other clients
    io.emit("message", formatMessage(user, msg, elokintAuto));

    // check for disconnects
    socket.on("disconnect", () => {
      // send message to all the clients when an user disconnects
      io.emit("message", formatMessage(bot, "User left the chat", ""));
    });
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
