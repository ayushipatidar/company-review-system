import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  fullName: {
    type: Schema.Types.String,
    required: true,
  },
  subject: {
    type: Schema.Types.String,
    required: false,
  },
  reviewText: {
    type: Schema.Types.String,
    required: false,
  },
  rating: {
    type: Schema.Types.Number,
    required: true,
  },
  profile: {
    type: Schema.Types.String,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "company",
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

const ReviewModel = mongoose.model("review", ReviewSchema);

export default ReviewModel;
