export interface Dish {
    id: string;
    name: string;
    description: string;
    price: number;
    imageURL: string;
    ingredients?: string[];
    category?: string[];
}

export interface FullDish extends Dish {
    count: number
}
