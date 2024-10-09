import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorfn from "./middlewares/error";
import router from "./routes/route1";
import connectDB from "./database";
let app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "process.env.FRONTEND_URL",
    credentials: true,
  })
);
connectDB();
// app.use("/api", route1, route2);
app.use(errorfn);
app.use('/api',router);
export default app;
