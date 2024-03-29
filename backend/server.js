const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { requestLogger, unknownEndpoint, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(requestLogger);

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
app.get("/", (req, res) => res.send("Server running"));

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
