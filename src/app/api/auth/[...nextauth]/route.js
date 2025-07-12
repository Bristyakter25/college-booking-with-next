import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../../actions/auth/loginUser";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
export const authOptions = {
  // Configure one or more authentication providers
   providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "email", placeholder: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      console.log(credentials)
      // Add logic here to look up the user from the credentials supplied
      const user = await loginUser(credentials)

      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })
],
pages: {
  signIn: "/login"
},

 callbacks: {
    async signIn({ user, account, profile }) {
      // Only do this for social providers, skip for credentials login
      if (account.provider === "google" || account.provider === "github") {
        try {
          await fetch("http://localhost:5000/social-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              image: user.image
            }),
          });
        } catch (error) {
          console.error("Error saving social user:", error);
          return false; // Prevent sign-in on failure if you want
        }
      }
      return true; // Allow sign in
    }
  }
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }