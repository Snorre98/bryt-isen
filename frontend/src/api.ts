/**
 * POST-request is used to "create" a new data-object in the db.
 * GET-request is used to get data from a spesific data-object in the db.
 * PUT-request is used to "edit" a specific data-object in the db.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosResponse } from 'axios';
import { ActivityDto } from './dto';
import { BACKEND_DOMAIN } from './constants';
import { ROUTES } from './routes';
import { reverse } from './named-urls';

/**
 * GET, PUT, POST http requests for activity object
 */

// get single activity, specific from id(used as primary key)
export async function getActivity(id: string | number): Promise<ActivityDto> {
  const url = BACKEND_DOMAIN + reverse({ pattern: ROUTES.backend.activity_detail, urlParams: { pk: id } });
  const response = await axios.get<ActivityDto>(url, { withCredentials: true });
  return response.data;
}

// add single activity
export async function postActivity(data: ActivityDto): Promise<ActivityDto> {
  const url = BACKEND_DOMAIN + ROUTES.backend.activity_list;
  const response = await axios.postForm<ActivityDto>(url, data, { withCredentials: true });
  return response.data;
}

// edit acitivity, specific from id(used as primary key)
export async function putActivity(id: string | number, data: Partial<ActivityDto>): Promise<AxiosResponse> {
  const url = BACKEND_DOMAIN + reverse({ pattern: ROUTES.backend.activity_detail, urlParams: { pk: id } });
  const response = await axios.put<ActivityDto>(url, data, { withCredentials: true });
  return response;
}

// gets all activities
export async function getActivities(): Promise<ActivityDto[]> {
  const url = BACKEND_DOMAIN + ROUTES.backend.activity_list;
  const response = await axios.get<ActivityDto[]>(url, { withCredentials: true });
  return response.data;
}
