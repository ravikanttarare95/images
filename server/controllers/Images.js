import Image from "./../models/Image.js";
import photokit from "./../configs/Photokit.js";

const addImage = async (req, res) => {
  const file = req.file;
  // req.file does not exist in plain Express.
  
  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const uploadResponse = await photokit.upload({
    file: file.buffer.toString("base64"),
    fileName: file.originalname,
  });
  // console.log(uploadResponse);

  const newImage = new Image({ imageURL: uploadResponse.url });
  await newImage.save();
  res.json({
    success: true,
    image: newImage,
    message: "Image added successfull.",
  });
};

const getImages = async (req, res) => {
  const images = await Image.find();
  if (images.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Data not found",
    });
  }
  res.json({
    success: true,
    data: images,
    message: "Images fetched successfully",
  });
};

export { addImage, getImages };
