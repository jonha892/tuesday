import { z } from "zod";

export const deviceSchema = z.object({
  id: z.number().int().nonnegative(),
  location: z.string().nonempty(),
  type: z.string().nonempty(), // unklar welche werte
  device_health: z.string().nonempty(), //unklar welche werte
  last_used: z.string().nonempty(), // unklar ob format einheitlich
  price: z.coerce.number().nonnegative(),
  color: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Color must be a valid hex color code"),
});

export type Device = z.infer<typeof deviceSchema>;
