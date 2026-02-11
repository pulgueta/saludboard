import { FileIcon, TrashIcon } from "@phosphor-icons/react";
import { Button } from "@ui/button";
import type { FC } from "react";

import type { UploadedFile } from "@/hooks/use-file-upload";

type FileListProps = {
  files: UploadedFile[];
  onRemove: (id: string) => void;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Displays a list of uploaded files with remove action.
 */
export const FileList: FC<FileListProps> = ({ files, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-medium text-foreground text-sm">
        Archivos ({files.length})
      </h4>
      <ul className="flex flex-col gap-2">
        {files.map((uploaded) => (
          <li
            key={uploaded.id}
            className="flex items-center gap-3 rounded-lg border p-3"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
              <FileIcon
                size={20}
                weight="duotone"
                className="text-foreground"
              />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-medium text-foreground text-sm">
                {uploaded.file.name}
              </span>
              <span className="text-muted-foreground text-xs">
                {formatFileSize(uploaded.file.size)}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Eliminar ${uploaded.file.name}`}
              onClick={() => onRemove(uploaded.id)}
            >
              <TrashIcon size={16} className="text-muted-foreground" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
