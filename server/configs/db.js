import mongoose from "mongoose";

const connectDb = async() => {
    try {
        mongoose.connection.on('connected', ()=> console.log
        ("Database Succesfully Connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/quicklog`)
    } catch (error) {
        console.log(error.message);
    }
}
export default connectDb;