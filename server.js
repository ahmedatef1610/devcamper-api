const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const cors = require('cors');

const connectDB = require("./config/db");
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/error");
const morgan = require("morgan");
const colors = require("colors");
/***************************************/
const app = express();
/***************************************/
dotenv.config({ path: "./config/config.env" });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload());

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});
app.use(apiLimiter);
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
/***************************************/
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index_1.html");
// });

app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
app.use(errorHandler);
/***************************************/

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
          .bold
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error: ${err.message}`.red);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });
