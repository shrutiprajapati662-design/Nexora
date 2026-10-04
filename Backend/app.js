import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.use("/api/applications", applicationRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);




// ---- ERROR MIDDLEWARE ALWAYS SHOULD BE IN LAST OTHERWISE IT WILL GIVE ERROR WHILE TESTING-------
app.use(errorMiddleware);

export default app;