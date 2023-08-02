import { EntitiesUserLogin, EntitiesUsers, EntitiesOneUser } from '@/entities';

export default interface BackendApiInterface {
  getUsers(): Promise<EntitiesUsers[]>;
  findOneUser(userId: any): Promise<EntitiesOneUser[]>;
  userLogin(userData: any): Promise<EntitiesUserLogin[]>;
}
