import mongoose from "mongoose";

export const HARDWARE_FAMILIES = [
  "fasteners",
  "electrical",
  "hand_tools",
  "power_tools",
  "plumbing",
  "safety",
  "building",
  "electronics",
  "other",
];

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, unique: true, sparse: true, trim: true },
    quantity: { type: Number, default: 0, min: 0 },
    lowStockThreshold: { type: Number, default: 5, min: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    itemType: {
      type: String,
      enum: ["hardware", "consumable", "other"],
      default: "hardware",
    },
    hardwareFamily: {
      type: String,
      enum: HARDWARE_FAMILIES,
      default: "other",
    },
    description: { type: String, trim: true },
    brand: { type: String, trim: true },
    model: { type: String, trim: true },
    manufacturerPartNumber: { type: String, trim: true },
    unit: { type: String, trim: true, default: "ea" },
    storageLocation: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Item = mongoose.model("Item", itemSchema);
