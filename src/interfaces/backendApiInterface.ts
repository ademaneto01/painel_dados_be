import { Escolas, Lessons, Users } from "@/entities";

export default interface BackendApiInterface {
    getEscolas(): Promise<Escolas[]>;
    getLessons(): Promise<Lessons[]>;
    getUsers(): Promise<Users[]>;
}
