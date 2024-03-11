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
  rest_csrf: '/csrf/',
  rest_api: '/api/',

  /**
   * Normal routes
   * These can be found at localhost:8000/api after you have created
   * model, view, serializer.
   *
   * in the f.ex. activity_detail, 'detail' just means that the route goes to a specific object
   */
  activity_list: '/api/activities/',
  activity_detail: '/api/activities/:pk/',
  /*This does not work yet: */
  user_activities: '/users/:user_id/activities/',

  /**
   * report activity
   *
   */

  reported_activity: '/reported-activities/',

  report_review_list: '/reported-reviews/',
  report_review_detail: '/reported-reviews/:pk/',

  /**
   *
   * User registration, login, logout
   */
  register_user: '/register/',
  login_brytisen_user: '/login/',
  logout_brytisen_user: '/logout/',
  brytisen_user: '/user/',
  review_list: '/reviews/',
};
