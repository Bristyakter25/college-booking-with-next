// "use server";

// import bcrypt from "bcryptjs";
// import dbConnect, { collectionNamesObj } from "../../../lib/mongoDBConnect";

// export const loginUser = async (payload) => {
//   const { email, password } = payload;

//   const userCollection = dbConnect(collectionNamesObj.userCollection);
//   const user = await userCollection.findOne({ email });

//   if (!user) return null;

//   // Corrected and awaited
//   const isPasswordOk = await bcrypt.compare(password, user.password);
//   if (!isPasswordOk) return null;

//   return user; // You may also want to omit password before returning
// };
export async function loginUser({ email, password }) {
  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  if (data.success && data.user) {
    return data.user; // ✅ only return user object
  }

  return null;
}
