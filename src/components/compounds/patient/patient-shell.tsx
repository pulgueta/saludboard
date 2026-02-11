import type { FC, ReactNode } from "react";

import { PatientTopNav } from "@/components/compounds/patient/patient-top-nav";

type PatientShellProps = {
  children: ReactNode;
};

/**
 * Top-level patient dashboard layout.
 *
 * Uses a top navigation bar (no sidebar) with a max-width
 * content container for a clean, consumer-friendly experience.
 */
export const PatientShell: FC<PatientShellProps> = ({ children }) => {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <PatientTopNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
};
