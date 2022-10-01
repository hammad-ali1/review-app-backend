import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

//Types
export interface TransactionInterface extends GlobalTypes.Transaction {
  //instance methods declarations
}
interface TransactionModelInterface extends Model<TransactionInterface> {
  //static method declarations
  getRatings: (_id: string) => Promise<any>;
}

const TransactionSchema = new Schema<GlobalTypes.Transaction>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "AccountancyUser",
    },
    nameOfTransaction: { type: String, required: true },
    dateOfTransaction: { type: Date, required: true },
    inflowOrOutflow: { type: String, required: true },
    type: { type: String, required: true },
    fromOrTo: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model<
  TransactionInterface,
  TransactionModelInterface
>("Transaction", TransactionSchema);

export default Transaction;
