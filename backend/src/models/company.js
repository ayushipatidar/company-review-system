import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  state: {
    type: Schema.Types.String,
    required: true,
  },
  city: {
    type: Schema.Types.String,
    required: true,
  },
  foundedOn: {
    type: Schema.Types.Date,
    required: true,
  },
  logo: {
    type: Schema.Types.String,
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

const CompanyModel = mongoose.model("company", CompanySchema);

export default CompanyModel;
