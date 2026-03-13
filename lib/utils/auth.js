import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import URLS from "@/lib/constants/urls";
import { apiClient } from "./apiClient";

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
          const res = await apiClient(URLS.AUTH.LOGIN, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          console.log(res);

          if (res.success && res.data) {
            return {
              id: res.data.user.id,
              email: res.data.user.email,
              fullName: res.data.user.fullName,
              active: res.data.user.active,
              token: res.data.token,
              tokenExpiryTime: res.data.tokenExpiryTime,
              refreshToken: res.data.refreshToken,
              refreshTokenExpiryTime: res.data.refreshTokenExpiryTime,
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
    async jwt({ token, user }) {
      // First login
      if (user) {
        return {
          user: {
            id: user.id,
            email: user.email,
            active: user.active,
          },
          accessToken: user.token,
          accessTokenExpiry: user.tokenExpiryTime,
          refreshToken: user.refreshToken,
          refreshTokenExpiryTime: user.refreshTokenExpiryTime,
        };
      }
      const now = Date.now();

      // If access token still valid → return existing token
      if (token.accessTokenExpiry && now < token.accessTokenExpiry) {
        return token;
      }

      // If expired → refresh
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
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
    const response = await apiClient(URLS.AUTH.REFRESH, {
      method: "POST",
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    if (!response.success) {
      throw response;
    }

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.token,
      accessTokenExpiry: refreshedTokens.tokenExpiryTime,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
      refreshTokenExpiryTime:
        refreshedTokens.refreshTokenExpiryTime ?? token.refreshTokenExpiryTime,
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
