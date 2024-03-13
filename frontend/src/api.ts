/**
 * POST-request is used to "create" a new data-object in the db.
 * GET-request is used to get data from a spesific data-object in the db.
 * PUT-request is used to "edit" a specific data-object in the db.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosResponse } from 'axios';
import { ActivityDto, FavoriteDto, RegisterUserDto, UserDto } from './dto';
import { BACKEND_DOMAIN } from './constants';
import { ROUTES } from './routes';
import { reverse } from './named-urls';

/**
 * GET, PUT, POST http requests for activity object
 */

/**
 * requests single activity data from the DB
 * @param id of the acitivity we want to get
 * @returns activity data (a JSON object)
 */
export async function getActivity(id: string | number): Promise<ActivityDto> {
  // Defines url, reverse is a function which (kind of)formats the request url.
  const url = BACKEND_DOMAIN + reverse({ pattern: ROUTES.backend.activity_detail, urlParams: { pk: id } });
  // Defines the response of the request. This is a "async" function, defined by the async keyword. Such functions are used if there is expected to take some time
  // for parts of the function to be executable. In this spesific case the function must wait for the HTTP response.
  // In TypeScript a async function waits on the part of the function that is maked with the "await" keyword to become ready.
  const response = await axios.get<ActivityDto>(url, { withCredentials: true }); // Defines response, using axios.
  return response.data;
}



/**
 * POST function for adding activity to DB.
 * @param data of the activity to be created and posted to the DB
 * @returns http response on the request(of type AxiosResponse)
 */
export async function postActivity(data: ActivityDto): Promise<AxiosResponse<ActivityDto>> {
  const url = BACKEND_DOMAIN + ROUTES.backend.activity_list;
  const response = await axios.postForm<ActivityDto>(url, data, { withCredentials: true });
  return response;
}

/**
 *
 * @param id of the activity we want to update
 * @param data of the activity we want to update
 * @returns http response on the request(of type AxiosResponse)
 */
export async function putActivity(id: string | number, data: Partial<ActivityDto>): Promise<AxiosResponse> {
  const url = BACKEND_DOMAIN + reverse({ pattern: ROUTES.backend.activity_detail, urlParams: { pk: id } });
  const response = await axios.put<ActivityDto>(url, data, { withCredentials: true });
  return response;
}

/**
 * GET-request for all acitivies
 * @returns list containing JSON with activity data
 */
export async function getActivities(): Promise<ActivityDto[]> {
  const url = BACKEND_DOMAIN + ROUTES.backend.activity_list;
  const response = await axios.get<ActivityDto[]>(url, { withCredentials: true });
  return response.data;
}


/**
 * DELETE-request for activity by
 * */
export async function deleteActivity(id:number): Promise<AxiosResponse> {
  const url = BACKEND_DOMAIN + reverse({ pattern: ROUTES.backend.activity_detail, urlParams: { pk: id } });
  const response = await axios.delete(url, { withCredentials: true });
  return response;
}



/**
 * GET-request for CSRF-token used to make sure all requests come from the frontend of the actual site
 * @returns token of type string
 */
export async function getCsrfToken(): Promise<string> {
  const url = BACKEND_DOMAIN + ROUTES.backend.rest_csrf;
  const response = await axios.get(url, { withCredentials: true });
  return response.data;
}

/**
 * POST request to add new user.
 * @param data assosiated with user to be registered
 * @returns http response (axios type)
 */
export async function registerUser(data: RegisterUserDto): Promise<AxiosResponse> {
  const url = BACKEND_DOMAIN + ROUTES.backend.register_user;
  const response = await axios.post(url, data, { withCredentials: true });
  const new_token = response.data;
  axios.defaults.headers.common['X-CSRFToken'] = new_token; //? is this needed when globalcontextprovider is up and running
  return response;
}

/**
 * POST request to set loggin
 * @param username, to loggin
 * @param password to loggin
 * @returns http response (axios format)
 */
export async function loginUser(username: string, password: string): Promise<number> {
  const url = BACKEND_DOMAIN + ROUTES.backend.login_brytisen_user;
  const postData = { username, password };
  const response = await axios.post(url, postData, { withCredentials: true });

  // Django ivalidates current CSRF token on login, must get new one
  const new_token = response.data;
  axios.defaults.headers.common['X-CSRFToken'] = new_token;
  //puts token in request header

  return response.status;
}

/**
 * POST request to set user as "undefined"
 * @returns http response (axios format)
 */
export async function logout(): Promise<AxiosResponse> {
  const LOGIN_STATUS = undefined;
  const url = BACKEND_DOMAIN + ROUTES.backend.logout_brytisen_user;
  const response = await axios.post(url, LOGIN_STATUS, { withCredentials: true });

  return response;
}

/**
 * GET request to get current user.
 * @returns user data (UserDto)
 */
export async function getUser(): Promise<UserDto> {
  const url = BACKEND_DOMAIN + ROUTES.backend.brytisen_user;
  const response = await axios.get<UserDto>(url, { withCredentials: true });
  return response.data;
}

export async function postReportedActivity(activity_id: number): Promise<AxiosResponse> {
  const url = BACKEND_DOMAIN + ROUTES.backend.reported_activity;
  const data = { activity_id: activity_id };
  const response = await axios.post(url, data, { withCredentials: true });
  return response;
}

/**
 * GET-request for all acitivies
 * @returns list containing JSON with activity data
 */
export async function getReportedActivities(): Promise<ActivityDto> {
  const url = BACKEND_DOMAIN + ROUTES.backend.reported_activity;
  const response = await axios.get<ActivityDto>(url, { withCredentials: true });
  return response.data;
}

/**
 *TODO: fix the view for this api call:
 */
// export async function getUserActivities(activity_owner: string): Promise<ActivityDto[]> {
//   const url =
//     BACKEND_DOMAIN + reverse({ pattern: ROUTES.backend.user_activities, urlParams: { user_id: activity_owner } });
//   const response = await axios.get<ActivityDto[]>(url, { withCredentials: true });
//   return response.data;
// }

export async function postFavoritedActivity(activity: number, user: number): Promise<AxiosResponse> {
  const url = BACKEND_DOMAIN + ROUTES.backend.favorited_activity;
  const data = { 
    activity_id: activity,
    favorited_by_user: user
  };
  const response = await axios.post(url, data, { withCredentials: true });
  return response;
}

export async function getFavoritedActivities(): Promise<FavoriteDto[]> {
  const url = BACKEND_DOMAIN + ROUTES.backend.favorited_activity;
  const response = await axios.get<FavoriteDto[]>(url, { withCredentials: true });
  return response.data;
}

export async function deleteFavoritActivity(id:number): Promise<AxiosResponse> {
  const url = BACKEND_DOMAIN + reverse({ pattern: ROUTES.backend.favorited_activity_detail, urlParams: { pk: id } });
  const response = await axios.delete(url, { withCredentials: true });
  return response;
}
