import { R2 } from "@convex-dev/r2";

import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";

export const storage = new R2(components.r2);

export const { generateUploadUrl, syncMetadata } = storage.clientApi<DataModel>(
  {
    checkUpload: async (ctx, bucket) => {
      // const user = await userFromAuth(ctx);
      // ...validate that the user can upload to this bucket
    },
    onUpload: async (ctx, bucket, key) => {
      // ...do something with the key
      // This technically runs in the `syncMetadata` mutation, as the upload
      // is performed from the client side. Will run if using the `useUploadFile`
      // hook, or if `syncMetadata` function is called directly. Runs after the
      // `checkUpload` callback.
    },
  },
);
