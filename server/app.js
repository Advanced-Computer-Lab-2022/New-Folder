// import modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { json, urlencoded } = express;
const session = require("express-session");
require("dotenv").config();

// app
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: process.env.SECRET,
    cookie: {},
    resave: true,
    saveUninitialized: true,
  })
);

// db
const connection = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERROR", err));

// routes

// instructor routes
const instructorRoutes = require("./routes/instructor.route");
app.use("/instructor", instructorRoutes);
// admin routes
const adminRoutes = require("./routes/admin.route");
app.use("/admin", adminRoutes);

// Course routes
const courseRoutes = require("./routes/course.route");
app.use("/course", courseRoutes);

// trainee routes
const traineeRoutes = require("./routes/trainee.route");
app.use("/trainee", traineeRoutes);

// guest routes
const guestRoutes = require("./routes/guest.route");
app.use("/", guestRoutes);
//port
const port = process.env.PORT || 8080;

// listener
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
