import { FullDish } from "./dishes.interface";

export interface Order{
    id: string;
    userName: string;
    userEmail: string;
    userAddress?: string;
    userTel?: string;
    positions: FullDish[];
    calcTotalPrice: number;

}
