const express = require("express");
const cors = require("cors"); // Import cors package
const connectToDB = require("./DB/connnectToDB");
require("dotenv").config();
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
connectToDB();

const app = express(xss());
app.use(helmet());
app.use(hpp());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);
app.use(
  cors({
    origin: process.env.DOMAIN_LINK,
  })
);

app.use(express.json());

const authRoute = require("./routes/authRouter");
const userRoute = require("./routes/userRouter");
const postRoute = require("./routes/postRouter");
const commentRoute = require("./routes/commentRouter");
const categoryRoute = require("./routes/categoryRouter");
const passwordRoute = require("./routes/passwordRoute");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/password", passwordRoute);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 4000, () => {
  console.log("server started");
});
