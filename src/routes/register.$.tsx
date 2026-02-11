import { createFileRoute } from "@tanstack/react-router";

import { AuthLayout } from "@/components/compounds/auth/auth-layout";
import { SignUpCard } from "@/components/compounds/auth/sign-up-card";

export const Route = createFileRoute("/register/$")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <AuthLayout>
      <SignUpCard />
    </AuthLayout>
  );
}
