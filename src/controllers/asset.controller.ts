import asyncHandler from "express-async-handler";
import Asset from "../models/Asset.model";

export const addAsset = asyncHandler(async (req, res): Promise<any> => {
  const asset: GlobalTypes.Transaction = req.body;
  try {
    const result = await Asset.findOneAndUpdate(
      //@ts-ignore
      { _id: asset._id },
      asset,
      { upsert: true }
    );

    return res.status(200).json(result);
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "error occured while creating asset" });
  }
});

export const getAssets = asyncHandler(async (req, res): Promise<any> => {
  const { user } = req.params;
  try {
    const result = await Asset.find({ user: user });
    return res.status(200).json(result);
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "error occured while fetching assets" });
  }
});

export const deleteAsset = asyncHandler(async (req, res): Promise<any> => {
  const { _id } = req.params;
  try {
    const result = await Asset.findByIdAndDelete(_id);
    return res.status(200).json(result);
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "error occured while deleting asset" });
  }
});
