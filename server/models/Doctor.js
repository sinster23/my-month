const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    specialization: { type: String, required: true },
    description: { type: String },
    experience: { type: Number }, // in years
    image: { type: String },
    tags: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    consultationFee: { type: Number, default: 0 },
    availability: { type: String }, // e.g., "Available Today"
    availableSlots: [
      {
        date: { type: String, required: true },
        times: [{ type: String }],
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
