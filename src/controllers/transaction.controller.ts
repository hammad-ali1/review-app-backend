import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Transaction from "../models/Transaction.model";
import Asset from "../models/Asset.model";

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

export const getTransactionsSummary = asyncHandler(
  async (req, res): Promise<any> => {
    const { user } = req.params;
    try {
      const cashFlowSummary = await Transaction.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(user),
          },
        },
        { $group: { _id: "$inflowOrOutflow", total: { $sum: "$amount" } } },
      ]);
      const assetSummary = await Asset.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(user),
          },
        },
        {
          $group: {
            _id: "$user",
            total: { $sum: "$price" },
          },
        },
      ]);
      const cashFlowDetail = await Transaction.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId("6337fcde1e2798cc6b20688b"),
          },
        },

        {
          $sort: {
            dateOfTransaction: 1,
          },
        },
        {
          $group: {
            _id: "$dateOfTransaction",
            result: { $push: { type: "$inflowOrOutflow", amount: "$amount" } },
          },
        },
      ]);

      const assetDetail = await Asset.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(user) } },

        {
          $sort: {
            acquiredDate: 1,
          },
        },
      ]);
      const result = {
        cashFlowDetail,
        cashFlowSummary,
        assetDetail,
        assetSummary,
      };
      return res.status(200).json(result);
    } catch (err: any) {
      console.log(err.message);
      res
        .status(400)
        .json({ message: "error occured while fetching transaction" });
    }
  }
);
