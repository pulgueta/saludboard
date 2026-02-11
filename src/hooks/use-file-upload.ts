import { useCallback, useState } from "react";

export type UploadedFile = {
  id: string;
  file: File;
  preview?: string;
};

type UseFileUploadOptions = {
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: Record<string, string[]>;
};

/**
 * Custom hook wrapping file upload state management.
 * Works with react-dropzone's onDrop callback.
 */
export function useFileUpload(options: UseFileUploadOptions = {}) {
  const { maxFiles = 10, maxSizeMB = 50 } = options;
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const addFiles = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles
        .slice(0, maxFiles - files.length)
        .map((file) => ({
          id: `${file.name}-${file.size}-${Date.now()}`,
          file,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        }));

      setFiles((prev) => [...prev, ...newFiles]);
    },
    [files.length, maxFiles],
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clear = useCallback(() => {
    for (const f of files) {
      if (f.preview) URL.revokeObjectURL(f.preview);
    }
    setFiles([]);
  }, [files]);

  return {
    files,
    addFiles,
    removeFile,
    clear,
    maxFiles,
    maxSizeMB,
    isFull: files.length >= maxFiles,
  };
}
