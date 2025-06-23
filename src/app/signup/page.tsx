import { redirect } from "next/navigation";
import { getCurrentUser } from "@/libs/auth";
import { SignupForm } from "@/components/auth/SignupForm";

export default async function SignupPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/boards");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Create your account</h1>
          <p className="mt-2 text-muted-foreground">Join BoardHub today</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
