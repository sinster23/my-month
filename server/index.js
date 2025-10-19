const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/AuthRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const {errorHandler} = require("./middleware/errorHandler.js");

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// export default app;
