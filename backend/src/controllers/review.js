import fs from "fs";
import path from "path";

import ReviewModel from "../models/review.js";

const add = async (req, res) => {
  try {
    const { fullName, subject, reviewText, rating, companyId, uploadFile } =
      req.body;
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
    await ReviewModel.deleteMany();
    const createdUser = await ReviewModel.create({
      fullName,
      subject,
      reviewText,
      rating,
      companyId,
      profile: uploadFile[0].name,
    });
    return res
      .status(201)
      .json({ message: "Review added successfully!", data: createdUser });
  } catch (error) {
    return res.status(500).json({
      message: error.message ? error.message : "Unexpected error occurred!",
    });
  }
};

const ReviewController = {
  add,
};
export default ReviewController;
