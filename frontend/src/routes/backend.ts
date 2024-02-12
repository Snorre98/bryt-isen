/**
 * This file contains backend routes.
 * It tells the frontend where to ask for data in backend.
 */

export const ROUTES_BACKEND = {
  /**
   * Admin routes
   */
  admin__root: '/admin/',
  admin__login: '/admin/login/',
  admin__logout: '/admin/logout',
  admin__password_change: '/admin/password_change/',
  admin__password_change_done: '/admin/password_change/done/',

  /**
   * REST routes
   */
  rest_framework__login: '/rest_framework/login/',
  rest_framework__logout: '/rest_framework/logout/',

  /**
   * Normal routes
   * These can be found at localhost:8000/api after you have created
   * model, view, serializer.
   *
   * in the (example) activity_detail, 'detail' just means that the route goes to a specific object
   */

  //TODO: check backend api routes
  activity_list: 'api/activities',
  activity_detail: 'api/activity/:pk/',
};
