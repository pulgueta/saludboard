import { Buildings, User } from "@phosphor-icons/react";
import type { FC } from "react";

import { AnimatedContainer } from "@/components/primitives/animated-container";
import { SelectionCard } from "@/components/primitives/selection-card";
import type { AccountType } from "@/lib/onboarding-context";

type AccountTypeSelectorProps = {
  selected: AccountType | null;
  onSelect: (type: AccountType) => void;
};

const ACCOUNT_TYPES: {
  type: AccountType;
  title: string;
  description: string;
  icon: typeof User;
}[] = [
  {
    type: "individual",
    title: "Profesional Individual",
    description:
      "Consultorio propio o independiente. Selecciona un campo de salud para habilitar las funciones de tu cuenta.",
    icon: User,
  },
  {
    type: "organization",
    title: "Organización",
    description:
      "Consultorio o centro de salud con múltiples especialidades y profesionales en tu equipo.",
    icon: Buildings,
  },
];

/**
 * Account type selection between Individual and Organization.
 * Each option is a large selectable card with icon, title, and description.
 */
export const AccountTypeSelector: FC<AccountTypeSelectorProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <div
      data-slot="account-type-selector"
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
      role="radiogroup"
      aria-label="Tipo de cuenta"
    >
      {ACCOUNT_TYPES.map(({ type, title, description, icon: Icon }, index) => (
        <AnimatedContainer key={type} delay={150 + index * 100} duration={450}>
          <SelectionCard
            selected={selected === type}
            onClick={() => onSelect(type)}
            role="radio"
            aria-checked={selected === type}
            className="min-h-full w-full flex-row items-start gap-4 p-4"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-muted md:size-12">
              <Icon size={24} weight="duotone" className="text-foreground" />
            </div>

            <div className="flex flex-col gap-1 pr-6">
              <span className="font-medium text-foreground">{title}</span>
              <span className="max-w-prose text-pretty text-muted-foreground text-sm">
                {description}
              </span>
            </div>
          </SelectionCard>
        </AnimatedContainer>
      ))}
    </div>
  );
};
