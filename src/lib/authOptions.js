import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../app/actions/auth/loginUser";


export const authOptions = {
  session: {
    strategy: "database", 
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser(credentials);
        if (user) {
          return {
            id: user._id?.toString(),
            email: user.email,
            name: user.name,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },

  
};
