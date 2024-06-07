import express from "express";
import { config } from "dotenv";
import cors from "cors"; 
import { booksRoutes } from "./Routes/booksRoutes";
import { conection } from "./db/conection";
import { AuthRoutes } from "./Routes/authRoutes";
import cookieParser from "cookie-parser"
config();

export const app = express()

const corsOptions = {
  credentials: true,
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());

app.use("/books", booksRoutes)
app.use("/auth", AuthRoutes)

conection();
