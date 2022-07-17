require('./config/db.config')
const routers = require('./routes/routes')
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const lusca = require("lusca");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const mongoUrl = process.env.MONGODB_URI;
const session_secret = process.env.SESSION_SECRET;

//setting all middleware
app.enable("trust proxy");
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);
app.use(cookieParser());
app.use(compression());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization,x-auth-token, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: session_secret,
    store: MongoStore.create({
      mongoUrl,
      autoRemove: "native",
    }),
  })
);

app.use(helmet.frameguard({ action: "DENY" }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use(cors());

// Here our API Routes
app.use(routers);

module.exports = app