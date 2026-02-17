import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@ui/drawer";
import { ScrollArea } from "@ui/scroll-area";
import type { FC } from "react";
import { Suspense } from "react";

import { PatientForm } from "@/components/features/patients/patient-form";
import { PatientFormSkeleton } from "@/components/features/patients/patient-form-skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface PatientDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PatientDrawer: FC<PatientDrawerProps> = ({
  open,
  onOpenChange,
}) => {
  const isMobile = useIsMobile();

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent
        className={
          isMobile ? "max-h-[90vh]" : "fixed inset-y-0 right-0 w-full max-w-lg"
        }
      >
        <DrawerHeader>
          <DrawerTitle>Nuevo paciente</DrawerTitle>
          <DrawerDescription>
            Registra un nuevo paciente en el sistema.
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-4 pb-4">
          <Suspense fallback={<PatientFormSkeleton />}>
            <PatientForm onSuccess={() => onOpenChange(false)} />
          </Suspense>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
