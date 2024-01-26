import { Jela } from "./Jela";
import { Komentar } from "./Komentar";
import { Ocena } from "./Ocena";
import { Sala } from "./Sala";

export interface Restoran
{
    id: number;
    naziv: string;
    opis: string;
    adresa: string;
    slika: string;
    meni: Jela[];
    komentari: Komentar[];
    sale: Sala[];
    ocene: Ocena[];
}