import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import CustomError from "./utils/customError.js";
import userRoutes from "./routes/userRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import corsOptions from "./config/corsOptions.js";
const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

// morgan logger
app.use(morgan("tiny"));

//serve static files

app.use('/', express.static(path.join(__dirname, '/public')));

// home route
app.get("/", (_req, res) => {
  res.status(201).send("Hello, welcome to ecomm backend");
});

// use user routes
app.use("/api/auth", userRoutes);
// collection routes
app.use("/api/collection", collectionRoutes);
// coupon routes
app.use("/api/coupon", couponRoutes);
// product routes
app.use("/api/product", productRoutes);

// unknown routes or 404
app.use((req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


//handle custom error
app.use((err, _req, res, next) => {
  if (err instanceof CustomError) {
    res.status(400).json({
      message: err.message,
      code: err.code,
    });
  } 
  else if(err.name === 'ValidationError'){
    res.status(400).json({
      message: err.message,
      code: err.status,
    });
  }
  else {
    next(err);
  }
});

// testing route
app.use("/api/test/", testRoutes);

export default app;
