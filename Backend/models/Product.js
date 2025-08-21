const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true, // Example: "Sofa", "Bed", "Dining Table"
    },
    brand: {
      type: String,
    },
    sizes: {
      type: [String], // Example: ["Small", "Medium", "Large"]
      required: true,
    },
    colors: {
      type: [String], // Example: ["Brown", "Beige", "Grey"]
      required: true,
    },
    collection: {
      type: String, // Example: "New Arrivals", "Luxury"
      required: true,
    },
    material: {
      type: String, // Example: "Wood", "Metal", "Fabric"
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String], // Example: ["modern", "wooden", "sofa"]
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin who created/added the product
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
