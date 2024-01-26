import { Komentar } from "./Komentar";
import { Ocena } from "./Ocena";

export interface Jela
{
    id: number;
    naziv: string;
    opis: string;
    kolicina: number;
    jedinicaMere: string;
    ocene: Ocena[];
    cena: number;
    slika: string;
    komentari: Komentar[];
}