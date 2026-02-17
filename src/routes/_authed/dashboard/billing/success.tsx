import { CheckCircleIcon } from "@phosphor-icons/react";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authed/dashboard/billing/success")({
  component: BillingSuccessPage,
});

function BillingSuccessPage() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/_authed/dashboard/billing/success",
  });
  const [isRedirecting, setIsRedirecting] = useState(false);

  const sessionId = (search as { session_id?: string })?.session_id;

  useEffect(() => {
    if (isRedirecting) {
      const timer = setTimeout(() => {
        navigate({ to: "/dashboard/billing" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isRedirecting, navigate]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircleIcon className="size-8 text-success" weight="duotone" />
          </div>
          <CardTitle className="text-2xl">¡Pago exitoso!</CardTitle>
          <CardDescription>
            Tu suscripción ha sido activada correctamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Ya puedes disfrutar de todas las funcionalidades de tu plan.
            {sessionId && (
              <span className="mt-2 block font-mono text-xs">
                ID de sesión: {sessionId}
              </span>
            )}
          </p>

          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate({ to: "/dashboard" })}>
              Ir al dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsRedirecting(true);
                navigate({ to: "/dashboard/billing" });
              }}
            >
              Ver facturación
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
