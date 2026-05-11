import { z } from 'zod';

export const TeamBrandSchema = z.object({
  id: z.string(),
  schoolName: z.string(),
  nickname: z.string(),
  abbreviation: z.string().min(2).max(5),
  conference: z.string().optional(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
  darkNeutral: z.string().optional(),
  lightNeutral: z.string().optional(),
  logos: z.object({
    primary: z.string(),
    alternate: z.string().optional(),
    wordmark: z.string().optional(),
    helmet: z.string().optional(),
    field: z.string().optional(),
    scoreboard: z.string().optional(),
  }),
  gradients: z.object({
    headerStart: z.string(),
    headerEnd: z.string(),
    buttonStart: z.string(),
    buttonEnd: z.string(),
  }).optional(),
});

export type TeamBrand = z.infer<typeof TeamBrandSchema>;
