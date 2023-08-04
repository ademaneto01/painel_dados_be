import {
  EntitiesUserLogin,
  EntitiesUsers,
  EntitiesOneUser,
  EntitiesDeletUser,
  EntitiesUrl,
} from '@/entities';

export default interface BackendApiInterface {
  getUsers(): Promise<EntitiesUsers[]>;
  getUrl(userId: any): Promise<EntitiesUrl[]>;
  deleteUser(userId: any): Promise<EntitiesDeletUser[]>;
  findOneUser(userId: any): Promise<EntitiesOneUser[]>;
  userLogin(userData: any): Promise<EntitiesUserLogin[]>;
  cadastroUser(userData: any): Promise<EntitiesOneUser[]>;
}
