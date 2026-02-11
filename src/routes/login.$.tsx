import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/components/compounds/auth/auth-layout";
import { SignInCard } from "@/components/compounds/auth/sign-in-card";

export const Route = createFileRoute("/login/$")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthLayout>
      <SignInCard />
    </AuthLayout>
  );
}
