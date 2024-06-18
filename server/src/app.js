
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const {Server } = require("socket.io")

const cors = require('cors');

const app = express();
dotenv.config();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  const: {
    origin:"http://localhost:3000",
    methods: ["GET" , "POST"],
  },
});
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology:true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`)); 

app.use(express.json());
const path = require('path');
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use('/',userRoutes)
app.use('/admin',adminRoutes)


module.exports = app;