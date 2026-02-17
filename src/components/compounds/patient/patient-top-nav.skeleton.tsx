import { Skeleton } from "@ui/skeleton";
import type { FC } from "react";

import { PATIENT_NAV_ITEMS } from "@/lib/patient-navigation-config";

export const PatientTopNavSkeleton: FC = () => {
  return (
    <header className="sticky top-0 border-b bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Skeleton className="h-7 w-32" />

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {PATIENT_NAV_ITEMS.map((item) => (
            <Skeleton key={item.href} className="h-7 w-20" />
          ))}
        </div>

        {/* Right: avatar + mobile menu button */}
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 shrink-0 rounded-full" />
          <Skeleton className="size-8 shrink-0 rounded-md md:hidden" />
        </div>
      </nav>
    </header>
  );
};
