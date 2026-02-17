import { WarningCircle } from "@phosphor-icons/react";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import type { FC } from "react";

export const AppErrorBoundary: FC<ErrorComponentProps> = ({ error }) => {
  const message =
    error instanceof Error ? error.message : "Ha ocurrido un error inesperado.";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-xl text-center">
        <CardHeader className="items-center">
          <WarningCircle
            size={48}
            weight="duotone"
            className="text-destructive"
          />
          <CardTitle>Algo salió mal</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>

        <CardContent />

        <CardFooter className="justify-center gap-3">
          <Button variant="outline" onClick={() => window.history.back()}>
            Volver atrás
          </Button>
          <Button onClick={() => window.location.reload()}>
            Recargar página
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
