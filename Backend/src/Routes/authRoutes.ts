import express  from "express";
import { createUser, logout, refreshToken, verifyUser } from "../Controller/controllerAuth";

export const AuthRoutes = express.Router()

AuthRoutes.post("/signup", createUser)
AuthRoutes.post("/login", verifyUser)
AuthRoutes.post("/logout", logout)
AuthRoutes.post("/refresh-token", refreshToken)