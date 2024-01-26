import { Korisnik } from "./Korisnik";

export interface Komentar
{
    id: number,
    tekst: string | null;
    korisnik: Korisnik;
    vremePostavljanja: Date;
}