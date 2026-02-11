import { createFileRoute } from "@tanstack/react-router";

import { AiGenerateButton } from "@/components/compounds/consent-forms/ai-generate-button";
import { ConsentEditor } from "@/components/compounds/consent-forms/consent-editor";
import { ConsentTemplateList } from "@/components/compounds/consent-forms/consent-template-list";
import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";

export const Route = createFileRoute(
  "/_authed/dashboard/documents/consent-forms",
)({
  component: ConsentFormsPage,
  pendingComponent: DashboardPageSkeleton,
});

function ConsentFormsPage() {
  return (
    <>
      <PageHeader
        title="Consentimientos informados"
        description="Plantillas y editor de consentimientos"
        actions={
          <AiGenerateButton
            onClick={() => {
              /** Non-functional in MVP */
            }}
          />
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <ConsentEditor />
        <div className="flex flex-col gap-4">
          <h3 className="font-medium text-foreground text-sm">
            Plantillas disponibles
          </h3>
          <ConsentTemplateList />
        </div>
      </div>
    </>
  );
}
