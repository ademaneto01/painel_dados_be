import {
  EntitiesUserLogin,
  EntitiesUsers,
  EntitiesOneUser,
  EntitiesDeletUser,
} from '@/entities';

export default interface BackendApiInterface {
  getUsers(): Promise<EntitiesUsers[]>;
  deleteUser(userId: any): Promise<EntitiesDeletUser[]>;
  findOneUser(userId: any): Promise<EntitiesOneUser[]>;
  userLogin(userData: any): Promise<EntitiesUserLogin[]>;
  cadastroUser(userData: any): Promise<EntitiesOneUser[]>;
}
