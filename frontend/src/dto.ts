//This file contains data-trasfer-objects, used in the API.
//data-transfer-objects relect the datastructure of objects that will be sendt
import { ActivityType } from './constants';

/**
 * Activity data-transfer-object, used to transer an acitivyt object to and from backend
 */
export type ActivityDto = {
  id?: number;
  name: string;
  details: string;
  activity_rules: string;
  activity_type: ActivityType;
  owner_id?: number;
  isReported: boolean;
};

/**
 * User data-transfer-object, used to transer a user object
 */
export type UserDto = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  date_joined: Date;
  last_login: Date;
  permissions?: string[];
  object_permissions?: ObjectPermissionDto[];
};

export type ObjectPermissionDto = {
  obj_pk: number;
  permission: string;
};
