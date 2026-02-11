import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Textarea } from "@ui/textarea";
import type { FC } from "react";

/**
 * Basic consent form editor.
 * Allows creating/editing a consent document with title, body, and patient fields.
 */
export const ConsentEditor: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Editor de consentimiento</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-5"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="consent-title">Título del documento</Label>
            <Input
              id="consent-title"
              placeholder="Ej: Consentimiento informado para..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="consent-patient">Paciente</Label>
            <Input
              id="consent-patient"
              placeholder="Nombre completo del paciente"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="consent-body">Contenido</Label>
            <Textarea
              id="consent-body"
              placeholder="Escriba el contenido del consentimiento informado..."
              className="min-h-[200px] resize-y"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit">Guardar documento</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
