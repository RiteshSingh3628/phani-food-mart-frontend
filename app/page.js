import ROUTES_PATH from '@/lib/constants/routePaths';
import { getUserSessionServer } from '@/lib/utils/session';
import { redirect } from "next/navigation";


export default async function HomePage() {
  const session = await getUserSessionServer();
  if (session?.user) {
    redirect(ROUTES_PATH.HOME);
  } else {
    redirect(ROUTES_PATH.LOGIN);
  }

  return null;
} 