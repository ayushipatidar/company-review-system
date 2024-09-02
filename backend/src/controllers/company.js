import fs from "fs";
import path from "path";

import CompanyModel from "../models/company.js";
import ReviewModel from "../models/review.js";

const add = async (req, res) => {
  try {
    const { name, city, foundedOn, state, uploadFile } = req.body;
    const user = await CompanyModel.findOne({ name });
    if (user) {
      return res.status(404).json({
        message: "Company already exists",
      });
    }

    let a = uploadFile[0].thumbUrl;
    let m = a.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    let b = Buffer.from(m[2], "base64");
    const __dirname = import.meta.dirname;

    fs.writeFile(
      `${path.join(__dirname, "../../public/uploads")}/${uploadFile[0].name}`,
      b,
      function (err) {
        if (!err) {
          console.log("image uploaded");
        } else {
          console.log(err);
        }
      }
    );
    const addedCompnay = await CompanyModel.create({
      name,
      city,
      foundedOn,
      state,
      logo: uploadFile[0].name,
    });
    return res
      .status(201)
      .json({ message: "Company added successfully", data: addedCompnay });
  } catch (error) {
    return res.status(500).json({
      message: error.message ? error.message : "Unexpected error occurred!",
    });
  }
};

const getCompanies = async (req, res) => {
  try {
    const { query } = req;
    const { sortBy, search } = query;

    let condition = {};
    if (search) {
      let searchLefttrim = search.trimLeft();
      let removeFirstSpace = "";
      if (searchLefttrim.includes(" ")) {
        let strIndex = searchLefttrim.indexOf(" ");
        removeFirstSpace = searchLefttrim.substring(
          0,
          strIndex > 0 ? strIndex : strIndex.Length
        );
        removeSecondSpace = search.replace(removeFirstSpace, "");
      }
      let cityStateSearch = removeFirstSpace ? removeFirstSpace : search;
      condition = {
        ...condition,
        $or: [
          {
            city: {
              $regex: new RegExp(cityStateSearch.trim(), "i"),
            },
          },
          {
            state: {
              $regex: new RegExp(cityStateSearch.trim(), "i"),
            },
          },
          {
            name: {
              $regex: new RegExp(cityStateSearch.trim(), "i"),
            },
          },
        ],
      };
    }

    const data = await CompanyModel.aggregate([
      { $match: condition },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "companyId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          totalReviews: { $size: "$reviews" },
          totalRating: { $sum: "$reviews.rating" },
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $eq: ["$totalReviews", 0] },
              then: 0,
              else: { $divide: ["$totalRating", "$totalReviews"] },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          city: 1,
          state: 1,
          foundedOn: 1,
          logo: 1,
          reviews: 1,
          totalReviews: 1,
          totalRating: 1,
          averageRating: 1,
          created_at: 1,
        },
      },
      {
        $sort: {
          [sortBy || "created_at"]: 1,
        },
      },
    ]);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({
      message: error.message ? error.message : "Unexpected error occurred!",
    });
  }
};
const getCompanyDetail = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await CompanyModel.findOne({ _id: id }).lean();

    if (!data) {
      return res.status(404).json({ message: "Company not found" });
    }
    const reviews = await ReviewModel.find({ companyId: id });
    data.reviews = reviews && reviews.length ? reviews : [];
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message ? error.message : "Unexpected error occurred!",
    });
  }
};
const CompanyController = {
  add,
  getCompanies,
  getCompanyDetail,
};
export default CompanyController;
