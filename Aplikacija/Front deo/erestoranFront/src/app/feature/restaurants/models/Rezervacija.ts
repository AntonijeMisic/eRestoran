import { Korisnik } from "./Korisnik";
import { Sto } from "./Sto";

export interface Rezervacija
{
    id: number;
    korisnik: Korisnik;
    sto: Sto;
    brojLjudi: number;
    datumRezervacije: Date;
}