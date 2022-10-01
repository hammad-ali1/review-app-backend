import asyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.model";

export const addTransaction = asyncHandler(async (req, res): Promise<any> => {
  const transaction: GlobalTypes.Transaction = req.body;
  try {
    const result = await Transaction.create({
      ...transaction,
    });
    return res.status(200).json({ transaction: result });
  } catch (err: any) {
    console.log(err.message);
    res
      .status(400)
      .json({ message: "error occured while creating transaction" });
  }
});
