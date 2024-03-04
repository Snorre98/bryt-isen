/**
 * Usefull constants for API
 *
 */
export const XCSRFTOKEN = 'X-CSRFToken';
export const BACKEND_DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN; //env. variable in docker env

/**
 * Activity types, used in dto and filter
 */

export const ActivityType = {
  TRENING: 'Trening',
  FEST: 'Fest',
  VERV: 'Verv',
  QUIZ: 'Quiz',
  KREATIV: 'Kreative aktiviteter',
  AKTIVE_SPILL: 'Aktive spill',
  BRETTSPIL: 'Brettspill',
  GAMING: 'Gaming',
  FILM: 'Film',
  TEATER: 'Teater',
  LÆRE: 'Lære',
  JOBB: 'Jobb',
  ANNET: 'Annet',
} as const;

export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];

export const FILTER_OPTIONS: Set<string> = new Set<string>(Object.values(ActivityType));
/**
 *
 */
