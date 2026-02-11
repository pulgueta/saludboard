import { CloudArrowUp } from "@phosphor-icons/react";
import type { FC, ReactNode } from "react";
import { useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";

type FileUploadZoneProps = {
  onDrop: (files: File[]) => void;
  disabled?: boolean;
  accept?: Record<string, string[]>;
  maxSizeMB?: number;
  /** Override the default message inside the dropzone. */
  children?: ReactNode;
  className?: string;
};

/**
 * Extensible dropzone component.
 * Default message: "Arrastra y suelta archivos aquí"
 * Pass children to override the default content.
 */
export const FileUploadZone: FC<FileUploadZoneProps> = ({
  onDrop,
  disabled = false,
  accept,
  maxSizeMB = 50,
  children,
  className,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    accept,
    maxSize: maxSizeMB * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-14 text-center transition-colors duration-200",
        isDragActive
          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
          : "border-border hover:border-primary/40 hover:bg-muted/50",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input {...getInputProps()} />
      {children ?? (
        <>
          <CloudArrowUp
            size={40}
            weight="duotone"
            className={cn(
              "mb-3 text-muted-foreground transition-colors",
              isDragActive && "text-primary",
            )}
          />
          <p className="font-medium text-foreground text-sm">
            {isDragActive
              ? "Suelta los archivos aquí"
              : "Arrastra y suelta archivos aquí"}
          </p>
          <p className="mt-1 text-muted-foreground text-xs">
            o{" "}
            <span className="font-medium text-primary hover:underline">
              selecciona archivos
            </span>{" "}
            para subir
          </p>
          <p className="mt-2 text-muted-foreground text-xs">
            Tamaño máximo por archivo: {maxSizeMB}MB
          </p>
        </>
      )}
    </div>
  );
};
