import { FullDish } from "./dishes.interface";

export interface Order{
    id: string;
    userEmail: string;
    positions: FullDish[];

}
