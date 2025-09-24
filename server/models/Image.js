import { model, Schema } from "mongoose";

const imageSchema = new Schema({
  imageURL: { type: String },
});

const Image = model("Image", imageSchema);

export default Image;
