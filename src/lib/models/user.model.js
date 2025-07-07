//User model, schema for your User collection, defining what fields each user document will contain.
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        clerkId: {
            type:String,
            required:true,
            unique:true
        },
        email: {
            type:String,
            required:true,
            unique:true
        },
        firstName: {
            type:String,
            required:true,
        },
        lastName: {
            type:String,
            required:true,
        },
        userName: {
            type:String,
            required:true,
            unique:true
        },
        profilePicture: {
            type:String,
            required:false,
        },
        isAdmin: {
            type:Boolean,
            default:false
        }
    },{timestamps:true}//Automatically adds createdAt and updatedAt fields to each document
)
//reuses an existing model if already defined (avoids model overwrite errors during hot reload).
// or creates the model if it doesn’t exist.
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;