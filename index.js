// REQUIRE MODULES
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import passport from "passport";
import ImageKit from "imagekit";

import pkg from "mongoose";
const { connect } = pkg;

import env from "./config/environment/index";

import authRoutes from "./routes/auth.route";
import postRoute from "./routes/post.route";
import galleryRoute from "./routes/gallery.route";
import staffRoute from "./routes/staff.route";

const app = express();

// EXPRESS MIDDLEWRARES SETUP
app.use(express.urlencoded({ extended: false }));

// To accept JSON objects
app.use(express.json());

// Passport Middleware
app.use(passport.initialize());
// require("./middlewares/passport.js")(passport);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.options("*", cors());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", postRoute);
app.use("/api/v1", galleryRoute);
app.use("/api/v1", staffRoute);

const startServer = async () => {
  try {
    await connect(env.MONGODB.url)
      .then(() => {
        console.log(`Database connected`);
      })
      .catch(() => {
        console.log(`Database not connected`);
      });
    app.listen(env.PORT || 3001, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
    startServer();
  }
};

app.get("/", (req, res) => {
  console.log("This is the home route");
  res.send("Welcome to the Home route of IBAADU RAHMAN BACKEND API");
});

app.get("/imagekit/auth", (req, res) => {
  const imagekit = new ImageKit({
    publicKey: env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: env.IMAGE_KIT_PUBLIC_KEY,
    urlEndpoint: env.IMAGE_KIT_URL_ENDPOINT,
  });

  const authenticationParameters = imagekit.getAuthenticationParameters();
  res.send(authenticationParameters);
});

startServer();
