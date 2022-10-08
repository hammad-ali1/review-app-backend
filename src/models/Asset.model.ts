import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

//Types
export interface AssetInterface extends GlobalTypes.Asset {
  //instance methods declarations
}
interface AssetModelInterface extends Model<AssetInterface> {
  //static method declarations
  getRatings: (_id: string) => Promise<any>;
}

const AssetSchema = new Schema<GlobalTypes.Asset>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "AccountancyUser",
    },
    item: { type: String, required: true },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    location: { type: String, required: true },
    owner: { type: String, required: true },
    acquiredDate: { type: Date, required: true },
    price: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    manufacturer: { type: String, required: true },
    series: { type: String, required: true },
    inurance: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Asset = mongoose.model<AssetInterface, AssetModelInterface>(
  "Asset",
  AssetSchema
);

export default Asset;
