import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
                                            // required - not empty, unique - unique in database
                                            username: {type: String, required: true, unique: true},
                                            password: {type: String, required: true},
                                            firstName: String,
                                            lastName: String,
                                            handle: {type: String, required: true, unique: true},
                                            image: {type: String},
                                        }, {collection: "users"});

export default usersSchema;