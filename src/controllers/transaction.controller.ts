import asyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.model";

export const addTransaction = asyncHandler(async (req, res): Promise<any> => {
  const transaction: GlobalTypes.Transaction = req.body;
  try {
    let result;
    //@ts-ignore
    if (transaction._id) {
      result = await Transaction.findOneAndUpdate(
        //@ts-ignore
        { _id: transaction._id },
        transaction,
        { upsert: true }
      );
    } else {
      //@ts-ignore
      delete transaction._id;
      result = await Transaction.create({ ...transaction });
    }
    // await Transaction.create({
    //   ...transaction,
    // });

    return res.status(200).json(result);
  } catch (err: any) {
    console.log(err.message);
    res
      .status(400)
      .json({ message: "error occured while creating transaction" });
  }
});

export const getTransactions = asyncHandler(async (req, res): Promise<any> => {
  const { user } = req.params;
  try {
    const result = await Transaction.find({ user: user });
    return res.status(200).json(result);
  } catch (err: any) {
    console.log(err.message);
    res
      .status(400)
      .json({ message: "error occured while fetching transaction" });
  }
});

export const deleteTransaction = asyncHandler(
  async (req, res): Promise<any> => {
    const { _id } = req.params;
    try {
      const result = await Transaction.findByIdAndDelete(_id);
      return res.status(200).json(result);
    } catch (err: any) {
      console.log(err.message);
      res
        .status(400)
        .json({ message: "error occured while deleting transaction" });
    }
  }
);
