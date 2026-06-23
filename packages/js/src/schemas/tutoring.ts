import { z } from "zod";

import { BaseResponseSchema } from "./common.js";

export const TutoringResponseSchema = BaseResponseSchema.extend({
  data: z.array(z.object({}).passthrough()),
}).passthrough();

export type TutoringResponse = z.infer<typeof TutoringResponseSchema>;
