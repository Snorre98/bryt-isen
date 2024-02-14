//This file contains data-trasfer-objects, used in the API.
//data-transfer-objects relect the datastructure of objects that will be sendt
import { ActivityType } from './constants';

/**
 * Activity data-transfer-object, used to transer an acitivyt object to and from backend
 */
export type ActivityDto = {
  id?: number | string;
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
  is_active: boolean;
  is_superuser: boolean;
  groups: GroupDto[];
  permissions?: string[];
  object_permissions?: ObjectPermissionDto[];
};

export type ObjectPermissionDto = {
  obj_pk: number;
  permission: string;
};

export type GroupDto = {
  id: number;
  name: string;
};
