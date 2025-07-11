"use server";

import bcrypt from "bcryptjs";
import dbConnect, { collectionNamesObj } from "../../../lib/mongoDBConnect";

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const userCollection = dbConnect(collectionNamesObj.userCollection);
  const user = await userCollection.findOne({ email });

  if (!user) return null;

  // Corrected and awaited
  const isPasswordOk = await bcrypt.compare(password, user.password);
  if (!isPasswordOk) return null;

  return user; // You may also want to omit password before returning
};
