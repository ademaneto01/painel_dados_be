import {
  EntitiesSchool,
  EntitiesDocumentation,
  EntitiesUsers,
  EntitiesMaterials,
} from '@/entities';

export default interface BackendApiInterface {
  getSchools(): Promise<EntitiesSchool[]>;
  getDocumentation(): Promise<EntitiesDocumentation[]>;
  getUsers(): Promise<EntitiesUsers[]>;
  getMaterials(): Promise<EntitiesMaterials[]>;
}
