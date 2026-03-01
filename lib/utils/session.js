import { cache } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth";

export const getUserSessionServer = cache(async () => {
  const session = await getServerSession(authOptions);
  return session;
});
