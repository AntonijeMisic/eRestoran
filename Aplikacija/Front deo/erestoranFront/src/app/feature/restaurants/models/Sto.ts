import { Rezervacija } from "./Rezervacija";

export interface Sto
{
    id: number;
    naziv: string;
    pozicijaX: number;
    pozicijaY: number;
    sirina: number;
    duzina: number;
    brojMesta: number;
    rezervacije: Rezervacija[];
}