import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
}, {timestamps: true});

export const Item =  mongoose.model("item", itemSchema);