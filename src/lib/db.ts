import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mahmoudnageeb2709_db_user:Bia97bZP8crXnX5O@cluster0.cvjmeww.mongodb.net/yaqeen?retryWrites=true&w=majority&appName=Cluster0'

let cached = (global as any).mongoose
if (!cached) { cached = (global as any).mongoose = { conn: null, promise: null } }

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
    }).then(m => m).catch(err => {
      cached.promise = null
      throw err
    })
  }
  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (err) {
    cached.promise = null
    throw err
  }
}
