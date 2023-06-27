import mongoose from "mongoose"; // load the mongoose library
const schema = new mongoose.Schema({ // create the schema
                                       topic: String,
                                       username: String,
                                       handle: String,
                                       time: String,
                                       image: String,
                                       title: String,
                                       liked: Boolean, // liked property of type Boolean
                                       likes: Number, // likes property of type Number
                                       replies: Number,
                                       retuits: Number,
                                       explored: Boolean,
                                       tuit: String, // tuit property of type String
                                       disliked: Boolean,
                                       dislikes: Number
                                   }, {collection: "tuits"}); // collection name where tuits are
// stored in tuiter database

export default schema; // export schema so it can be used elsewhere