import { model, Schema } from "mongoose";

const userSchema = new Schema({
  image: { type: String },
});

const Image = model("Image", userSchema);

export default Image;
