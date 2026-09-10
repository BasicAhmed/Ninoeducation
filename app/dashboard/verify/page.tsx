import { redirect } from "next/navigation";
import { verifyLoginToken } from "@/lib/student-auth";

export const metadata = { robots: { index: false } };

export default async function DashboardVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const sp = await searchParams;
  if (!sp.token) redirect("/dashboard/login?error=expired");
  await verifyLoginToken(sp.token);
  return null;
}
