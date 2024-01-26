import { ObjekatSale } from "./ObjekatSale";
import { Sto } from "./Sto";

export interface Sala{
    id: number;
    sirina: number;
    duzina: number;
    stolovi: Sto[];
    predmeti: ObjekatSale[];
}