import { FileTextIcon } from "@phosphor-icons/react";
import { Badge } from "@ui/badge";
import { Card, CardContent } from "@ui/card";
import type { FC } from "react";

type ConsentTemplate = {
  id: string;
  name: string;
  description: string;
  category: string;
};

const MOCK_TEMPLATES: ConsentTemplate[] = [
  {
    id: "1",
    name: "Consentimiento informado general",
    description: "Consentimiento básico para procedimientos médicos generales.",
    category: "General",
  },
  {
    id: "2",
    name: "Consentimiento para procedimiento quirúrgico",
    description:
      "Autorización del paciente para intervenciones quirúrgicas con riesgos asociados.",
    category: "Cirugía",
  },
  {
    id: "3",
    name: "Consentimiento para tratamiento farmacológico",
    description:
      "Aceptación informada del paciente para inicio de tratamiento con medicamentos.",
    category: "Farmacología",
  },
  {
    id: "4",
    name: "Autorización de manejo de datos personales",
    description:
      "Cumplimiento de la Ley 1581 de 2012 para tratamiento de datos de salud.",
    category: "Legal",
  },
  {
    id: "5",
    name: "Consentimiento para toma de imágenes diagnósticas",
    description:
      "Autorización para radiografías, ecografías y otros estudios de imagen.",
    category: "Diagnóstico",
  },
];

/**
 * List of available consent form templates.
 */
export const ConsentTemplateList: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      {MOCK_TEMPLATES.map((template) => (
        <Card
          key={template.id}
          className="cursor-pointer p-4 transition-colors hover:bg-muted/30"
        >
          <CardContent className="flex items-start gap-4 p-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileTextIcon size={20} weight="duotone" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-medium text-foreground text-sm">
                  {template.name}
                </span>
                <Badge variant="secondary" className="shrink-0 text-xs">
                  {template.category}
                </Badge>
              </div>
              <p className="text-muted-foreground text-xs">
                {template.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
