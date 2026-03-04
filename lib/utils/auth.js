import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import URLS from "@/lib/constants/urls";

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
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(URLS.AUTH.LOGIN, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          const result = await res.json();

          if (res.ok && result.success && result.data) {
            return {
              id: result.data.id,
              email: result.data.email,
              firstName: result.data.firstName,
              lastName: result.data.lastName,
              token: result.data.token,
              tokenExpiryTime: result.data.tokenExpiryTime,
              refreshToken: result.data.refreshToken,
              refreshTokenExpiryTime: result.data.refreshTokenExpiryTime,
              message: result.message
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token = {
          ...token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
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

async function refreshAccessToken(token) {
  try {
    const response = await fetch(URLS.AUTH.REFRESH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok || !refreshedTokens.success) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.data.token,
      accessTokenExpiry: refreshedTokens.data.tokenExpiryTime,
      refreshToken: refreshedTokens.data.refreshToken ?? token.refreshToken,
      refreshTokenExpiryTime:
        refreshedTokens.data.refreshTokenExpiryTime ??
        token.refreshTokenExpiryTime,
    };
  } catch (error) {
    console.error("RefreshTokenError", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth(authOptions);
export { handler };
