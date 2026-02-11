import { createFileRoute } from "@tanstack/react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";

import { FileList } from "@/components/compounds/file-upload/file-list";
import { FileUploadZone } from "@/components/compounds/file-upload/file-upload-zone";
import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";
import { useFileUpload } from "@/hooks/use-file-upload";

export const Route = createFileRoute("/_authed/dashboard/documents/")({
  component: DocumentsPage,
  pendingComponent: DashboardPageSkeleton,
});

function DocumentsPage() {
  const { files, addFiles, removeFile } = useFileUpload({ maxFiles: 20 });

  return (
    <>
      <PageHeader
        title="Documentos"
        description="Gestiona archivos y documentos clínicos"
      />
      <Card>
        <CardHeader>
          <CardTitle>Subir archivos</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FileUploadZone onDrop={addFiles} />
          <FileList files={files} onRemove={removeFile} />
        </CardContent>
      </Card>
    </>
  );
}
