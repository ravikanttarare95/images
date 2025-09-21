import React from "react";

const addImage = async (req, res) => {
  const { image } = req.body;
  const newImage = image;
  res.json({
    success: true,
    image: newImage,
    message: "Image added successfull.",
  });
};

const getImages = async (req, res) => {
  const images = await Images.find();
  if (images.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Data not found",
    });

    res.json({
      success: true,
      data: users,
      message: "Images fetched successfully",
    });
  }
};

export { addImage, getImages };
