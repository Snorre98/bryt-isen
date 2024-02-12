/**
 * This file contains usefull functions that could be imported
 * across frontend.
 */
import { UserDto } from './dto';
export type hasPerm = {
  user: UserDto | undefined;
  permission: string;
  obj?: string | number;
};

export function hasPermission({ user, permission, obj }: hasPerm): boolean {
  //TODO: finish this
  return true;
}
