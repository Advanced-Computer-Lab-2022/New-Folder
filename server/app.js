// import modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { json, urlencoded } = express;
require("dotenv").config();

// app
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERROR", err));

// routes
// instructor routes
const instructorRoutes = require("./routes/instructor");
app.use("/instructor", instructorRoutes);

// admin routes
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

// trainee routes
const traineeRoutes = require("./routes/trainee");
app.use("/", traineeRoutes);

//port
const port = process.env.PORT || 8080;

// listener
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
