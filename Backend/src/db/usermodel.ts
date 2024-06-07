import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
    email: {
        type: String,
        unique: true,
        require: true
    },
    hash:{
        type: String,
        required: true
    },
    readingSessions: {
        type: Number
    }
})

export const User = mongoose.model("User", UserSchema);