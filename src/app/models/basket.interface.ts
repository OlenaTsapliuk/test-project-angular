import { FullDish } from "./dishes.interface";

export interface Basket{
    dishes: FullDish[];
    totalPrice: number;
    calcCount: number;
}