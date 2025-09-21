import Image from "./../models/Image.js";

const addImage = async (req, res) => {
  const { imageURL } = req.body;
  const newImage = new Image({ imageURL });
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
