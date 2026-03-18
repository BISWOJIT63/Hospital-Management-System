import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hospital_management";

export async function connect() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI);
  }
}

export async function disconnect() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

export async function withDb(callback) {
  try {
    await connect();
    await callback(mongoose.connection);
  } finally {
    await disconnect();
  }
}
