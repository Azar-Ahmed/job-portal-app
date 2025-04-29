import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/user.route.js";
import jobRouter from "./routes/job.router.js";
import applicationRouter from "./routes/application.route.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";

const app = express();
config({ path: "./src/config/config.env" });

// Middlewares
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Cron Job
newsLetterCron();

// Database Connection
connectDB();

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Error Middleware
app.use(errorMiddleware);

export default app;
