import { z } from "zod";

const preConfig = {
  API_URL: import.meta.env.VITE_API_URL as string,
};

const AppConfigSchema = z.object({
  API_URL: z.string().min(1),
});

export const config = AppConfigSchema.parse(preConfig);
