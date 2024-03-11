//This file contains data-trasfer-objects, used in the API.
//data-transfer-objects relect the datastructure of objects that will be sendt
import { ActivityType } from './constants';

/**
 * Activity data-transfer-object, used to transer an acitivyt object to and from backend
 */
export type ActivityDto = {
  id?: number;
  title: string;
  details: string;
  activity_rules: string;
  activity_type: ActivityType | string;
  activity_image: File;
  owner?: number;
  isReported?: boolean;
  
};

/**
 * Data transfer object used to transfer registration data to backend
 */
export type RegisterUserDto = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};

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

export type ReviewDto = {
  filter(arg0: (review: any) => boolean): unknown;
  id?: number;
  activity: number;
  rating: number;
  details: string;
  owner?: number;
};


