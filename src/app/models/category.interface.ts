export interface Category{
    id?: string;
    name?: string;
    imageURL?: string;
}

export enum CategoriesType {
    Sup = '01',
    Salad = '02',
    Hot = '03',
    Dessert='04'

}
export interface CategoriesListOption<T> {
    label: string,
    value: T
}