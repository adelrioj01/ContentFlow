import {z} from 'zod';

export const sceneSchema = z.object({
  title: z.string(),
  body: z.string(),
  durationSeconds: z.number().positive(),
  accent: z.string().default('#B7FF3C'),
  image: z.string().optional(),
});

export const videoSchema = z.object({
  headline: z.string(),
  narration: z.string(),
  scenes: z.array(sceneSchema).min(1),
  voiceover: z.string().optional(),
  music: z.string().optional(),
  handle: z.string().default('@tu_canal'),
  callToAction: z.string().default('Sígueme para más'),
});

export type VideoProps = z.infer<typeof videoSchema>;
export type Scene = z.infer<typeof sceneSchema>;

export const getDurationSeconds = (props: VideoProps) =>
  props.scenes.reduce((total, scene) => total + scene.durationSeconds, 0);
