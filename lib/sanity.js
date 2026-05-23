import { createClient } from "@sanity/client";

const options = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET_NAME,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_READ_TOKEN,
};

export const previewClient = createClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export default createClient(options);
