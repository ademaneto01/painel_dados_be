import {
  EntitiesSchool,
  EntitiesDocumentation,
  EntitiesUsers,
  EntitiesMaterials,
  EntitiesLessons,
  EntitiesTeacherGuides,
} from '@/entities';

export default interface BackendApiInterface {
  getSchools(): Promise<EntitiesSchool[]>;
  getDocumentation(): Promise<EntitiesDocumentation[]>;
  getUsers(): Promise<EntitiesUsers[]>;
  getMaterials(): Promise<EntitiesMaterials[]>;
  getLessons(): Promise<EntitiesLessons[]>;
  getTeacherGuides(): Promise<EntitiesTeacherGuides[]>;
}
