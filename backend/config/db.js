import mongoose from "mongoose"


export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://ashishkrobo:ashish123@cluster0.sgksj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB connected"));
}