// import CredentialsProvider from "next-auth/providers/credentials";
// import { loginUser } from "../app/actions/auth/loginUser";

// export const authOptions = {
//   session: {
//     strategy: "database",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await loginUser(credentials);
//         if (user) {
//           return {
//             id: user._id?.toString(),
//             email: user.email,
//             name: user.name,
//             image: user.image, 
//           };
//         }
//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//   async jwt({ token, user }) {
//     if (user) {
//       token.name = user.name;
//       token.email = user.email;
//       token.image = user.image; // ✅ This carries the image forward
//     }
//     return token;
//   },
//   async session({ session, token }) {
//     session.user.name = token.name;
//     session.user.email = token.email;
//     session.user.image = token.image; // ✅ This makes it available in session.user.image
//     return session;
//   }
// }
// };
