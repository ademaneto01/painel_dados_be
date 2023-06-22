import { Escolas, Lessons } from "@/entities";

export default interface BackendApiInterface {
    getEscolas(): Promise<Escolas[]>;
    getLessons(): Promise<Lessons[]>
}