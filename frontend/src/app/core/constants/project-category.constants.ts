export const PROJECT_CATEGORIES = [
  'software',
  'datos',
  'hibrido',
  'seguridad',
  'testing',
  'redes',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];