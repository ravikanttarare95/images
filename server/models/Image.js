import { model, Schema } from "mongoose";

const imageSchema = new Schema({
  file: { type: String },
});

const Image = model("Image", imageSchema);

export default Image;
