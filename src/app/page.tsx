import { redirect } from "next/navigation";
import { getCurrentUser } from "@/libs/auth";
import { LandingPage } from "@/components/LandingPage";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/boards");
  }

  return <LandingPage />;
}
