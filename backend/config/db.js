import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Adding the database name after the '/' in the URI (replace 'yourDatabase' with the actual DB name you want to connect to)
    const uri = 'mongodb+srv://ashishkrobo:ashish123@cluster0.sgksj.mongodb.net/yourDatabase?retryWrites=true&w=majority&appName=Cluster0';

    // Connecting to MongoDB using Mongoose
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // SSL should be enabled by default with mongodb+srv, but you can explicitly specify it if needed
      ssl: true
    });

    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
