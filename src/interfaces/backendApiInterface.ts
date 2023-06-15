import { Escolas } from "@/entities";

export default interface BackendApiInterface {
    getEscolas(): Promise<Escolas[]>;
}