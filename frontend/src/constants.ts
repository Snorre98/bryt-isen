/**
 * Usefull constants for API
 *
 */
export const XCSRFTOKEN = 'X-CSRFToken';
export const BACKEND_DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN; //env. variable in docker env

/**
 * Activity types, used in dto
 */

export const ActivityType = {
  UNDEFINED: 'Udefinert',
  TRENING: 'Trening',
  FYLLA: 'Fylla',
  VERV: 'Verv',
  TOPPTUR: 'Topptur',
} as const;

export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];

export const FILTER_OPTIONS: Set<string> = new Set<string>(Object.values(ActivityType));
/**
 *
 */
