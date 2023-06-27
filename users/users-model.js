import mongoose from "mongoose";
import usersSchema from "./users-schema.js";

const usersModel = mongoose.model("users", usersSchema); // name of the collection
export default usersModel;