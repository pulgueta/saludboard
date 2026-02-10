import {
  CalendarCheck,
  ChartBar,
  Clipboard,
  Sparkle,
} from "@phosphor-icons/react";
import type { FC } from "react";
import { useEffect } from "react";

import { OnboardingHeader } from "@/components/compounds/onboarding/onboarding-header";
import { OnboardingStep } from "@/components/compounds/onboarding/onboarding-step";
import { AnimatedContainer } from "@/components/primitives/animated-container";
import { useOnboarding } from "@/lib/onboarding-context";

const FEATURES = [
  {
    icon: Clipboard,
    label: "Historia clínica",
    description: "Registros clínicos organizados y accesibles.",
  },
  {
    icon: CalendarCheck,
    label: "Agenda de citas",
    description: "Gestión y seguimiento de consultas.",
  },
  {
    icon: Sparkle,
    label: "Asistencia con IA",
    description: "Orientación inteligente en cada paso.",
  },
  {
    icon: ChartBar,
    label: "Analítica básica",
    description: "Métricas claras de tu práctica.",
  },
];

/**
 * Step 1: Welcome screen introducing SaludBoard and its core features.
 */
export const WelcomeStep: FC = () => {
  const { setFooterConfig } = useOnboarding();

  useEffect(() => {
    setFooterConfig({ nextLabel: "Empezar" });
  }, [setFooterConfig]);

  return (
    <OnboardingStep>
      <OnboardingHeader
        title="Bienvenido a SaludBoard"
        subtitle="Tu plataforma integral para gestionar pacientes, citas e historia clínica. Configuremos tu cuenta en pocos pasos."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FEATURES.map(({ icon: Icon, label, description }, index) => (
          <AnimatedContainer
            key={label}
            delay={200 + index * 80}
            duration={450}
          >
            <div className="flex items-start gap-3.5 rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon size={18} weight="duotone" className="text-primary" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-foreground">{label}</span>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </span>
              </div>
            </div>
          </AnimatedContainer>
        ))}
      </div>
    </OnboardingStep>
  );
};
