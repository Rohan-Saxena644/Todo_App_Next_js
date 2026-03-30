import mongoose from "mongoose";    

const MONGODB_URL = process.env.MONGODB_URL;    

if(!MONGODB_URL) {
    throw new Error("Please define the MONGODB_URL environment variable");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(){

    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URL).then((mongoose) => {
            return mongoose;
        })
    }

    try{
        // const conn = await mongoose.connect(MONGODB_URL);
        // console.log(`MongoDB Connected: ${conn.connection.host}`);

        const conn = await cached.promise;
        cached.conn = conn;
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);

    }catch(error){
        cached.promise = null;
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }

    return cached.conn;
}


export default connectDB;


//We have written so much of code to connect to mongodb to ensure that we do not create multiple connections in development mode, because in development mode, Next.js hot reloads the code and if we create multiple connections, it can lead to memory leaks and performance issues. So we have implemented a caching mechanism to store the connection and reuse it if it already exists.