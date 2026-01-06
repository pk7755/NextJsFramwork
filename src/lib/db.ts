// In express js
// step-1 connecte db function
// step-2 mongoose.connect('mongoodburl')

import { connect, Connection} from "mongoose"

let mongodbUrl = process.env.MONGODB_URL
if(!mongodbUrl) {
    throw new Error("MONGODB_URL is not defined in environment variables")
}

const globalCache = global.mongoose ?? (global.mongoose = { conn: null, promise: null }); // ??- Nullish Coalescing


const connectDb = async () : Promise<Connection> =>  {
     // If already connected, reuse it
    if (globalCache.conn) {
        return globalCache.conn;
    }

      // Create connection promise once
    if (!globalCache.promise) {
        globalCache.promise = connect(mongodbUrl, {
            bufferCommands: false, // Queries are NOT buffered If DB is not connected -> throws error immediately
            autoIndex: false, // better for production
        })
        .then((mongooseInstance) => mongooseInstance.connection);
    }

    try {
       globalCache.conn = await globalCache.promise
    } catch (e) {
        throw e
    }

    return globalCache.conn 
}

export default connectDb
  