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
  UNDEFINED: 'UNDEFINED',
  TRENING: 'TRENING',
  FYLLA: 'FYLLA',
  VERV: 'VERV',
  TOPPTUR: 'TOPPTUR',
} as const;

export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];

/**
 *
 */
