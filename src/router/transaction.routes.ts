import { Router } from "express";

import { addTransaction } from "../controllers/transaction.controller";
const transactionRouter = Router();

transactionRouter.route("/add").post(addTransaction);

export default transactionRouter;
