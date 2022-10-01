import { Router } from "express";

import {
  addTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transaction.controller";
const transactionRouter = Router();

transactionRouter.route("/add").post(addTransaction);
transactionRouter.route("/:user").get(getTransactions);
transactionRouter.route("/delete/:_id").post(deleteTransaction);

export default transactionRouter;
