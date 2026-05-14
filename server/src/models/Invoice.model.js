import mongoose from "mongoose";

const lineSchema = new mongoose.Schema({
  description: String,
  quantity: { type: Number, default: 1 },
  unitPrice: { type: Number, default: 0 },
});

const invoiceSchema = new mongoose.Schema(
  {
    number: { type: String, unique: true },
    customer: { type: String, required: true },
    status: {
      type: String,
      enum: ["draft", "sent", "paid", "void"],
      default: "draft",
    },
    lines: [lineSchema],
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
