import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//Routers
import employeeRouter from "./router/employee.routes";
import departmentRouter from "./router/department.routes";
import userRouter from "./router/user.routes";
//Middlewares
import { attachUserToResponse } from "./middlewares/auth.middleware";
dotenv.config();
const app = express();
//add middlewares
app.use(cors());
app.use(express.json());
app.use(attachUserToResponse);

//connection uri
const uri = process.env.ATLAS_URI;
//establish mongodb connection
mongoose.connect(uri!);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

//set up routers
app.use("/api/employees", employeeRouter);
app.use("/api/departments", departmentRouter);
app.use("/api/users", userRouter);
//listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on port ${port}`));