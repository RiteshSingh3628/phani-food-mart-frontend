import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000,
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {},
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: [user.role],
          },
          accessToken: user.token,
          accessTokenExpiry: user.tokenExpiryTime,
          refreshToken: user.refreshToken,
          refreshTokenExpiryTime: user.refreshTokenExpiryTime,
        };
      }
      const now = Date.now();
      const shouldRefresh =
        (token?.accessTokenExpiry &&
          token.accessTokenExpiry - now < 10 * 60 * 1000) ||
        (token?.refreshTokenExpiryTime &&
          token.refreshTokenExpiryTime - now < 0);
      if (shouldRefresh) {
        token = await refreshAccessToken(token);
      }
      return token;
    },
    async session({ session, token }) {
      return token ? { ...session, ...token } : session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler };
