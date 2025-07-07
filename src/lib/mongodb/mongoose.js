//connect your Next.js app to MongoDB using Mongoose
import mongoose from "mongoose";

//This flag ensures that the app doesn't reconnect to MongoDB multiple times
let initialized = false;

export const connect = async() =>{
    //ensures that Mongoose will only allow querying fields that are defined in the schema
    mongoose.set('strictQuery', true);
    if(initialized) {
        console.log('Already connected to MongoDB');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:'my-blog',
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('connect to mongodb');
        initialized= true;
    } catch (error) {
        console.log('Error connecting to Mongodb', error)
    }
}