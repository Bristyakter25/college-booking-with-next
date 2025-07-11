"use server";

import bcrypt from "bcryptjs";
import dbConnect, { collectionNamesObj } from "../../../lib/mongoDBConnect";

export const registerUser = async (payload) => {
  try {
    const userCollection = await dbConnect(collectionNamesObj.userCollection);
    const { email, password } = payload;
    if (!email || !password) return { success: false, message: "Missing credentials" };

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) return { success: false, message: "User already exists" };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { ...payload, password: hashedPassword };

    const result = await userCollection.insertOne(newUser);

    return {
      success: true,
      insertedId: result.insertedId.toString(), 
    };
  } catch (err) {
    console.error("Registration error:", err);
    return { success: false, message: "Server error" };
  }
};
